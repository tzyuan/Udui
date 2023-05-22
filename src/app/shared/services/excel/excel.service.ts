import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Observable } from 'rxjs';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor() { }

  private getData = (json: any[]): any => {
    const columns = this.getColumnTitle(json[0]);
    let data = [columns];
    json.forEach(item => {
      let row = [];
      columns.forEach(col => {
        row = [...row, item[col]];
      });
      data = [...data, row];
    });
    return data;
  }

  private getColumnTitle = (data) => {
    let columns = [];
    // tslint:disable-next-line:forin
    for (const key in data) {
      columns = [...columns, key];
    }
    return columns;
  }

  /**
   * 导出文件
   * 常规导出文件方法
   * 使用keyToTitle方法转换数据后直接导出
   */
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const data = this.getData(json);
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, `${excelFileName}${EXCEL_EXTENSION}`);
  }

  public saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  // 导出文件 by json对象
  public exportAsExcelFileMoreSheetByJson(data, sheetNames: string[], excelFileName) {
    const worksheet = {};
    sheetNames.forEach((sheet, index) => {
      worksheet[sheet] = XLSX.utils.json_to_sheet(data[index]);
    });
    const workbook: XLSX.WorkBook = { Sheets: worksheet, SheetNames: sheetNames };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  // 导出文件 by sheet对象
  public exportAsExcelFileMoreSheetBySheet(sheets, sheetNames: string[], excelFileName) {
    const workbook = {
      SheetNames: [...sheetNames],
      Sheets: {}
    };
    sheetNames.forEach((sheet, index) => {
      workbook.Sheets[sheet] = sheets[index];
    });
    const wbout = XLSX.write(workbook, {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary'
    });
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    // 字符串转ArrayBuffer
    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        // tslint:disable-next-line:no-bitwise
        view[i] = s.charCodeAt(i) & 0xFF;
      }
      return buf;
    }

    let url = '';
    if (typeof blob === 'object' && blob instanceof Blob) {
      url = URL.createObjectURL(blob); // 创建blob地址
    }
    const aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = `${excelFileName}.xlsx` || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    let event;
    if ((window as any).MouseEvent) {
      event = new MouseEvent('click');
    } else {
      event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
  }

  readFile = (file: File, fileFormat: string[]): Observable<{ error: number, msg: string, data: any }> => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    let format = false;
    const fileName = file.name.toLowerCase().split('.').splice(-1);
    fileFormat.forEach(element => {
      if (fileName[0] === element) {
        format = true;
      }
    });
    return new Observable(observer => {
      if (format) {
        reader.onload = (e: Event) => {
          const result = (e.target as FileReader).result;
          const read = XLSX.read(result, { type: 'binary' });
          const jsonData = JSON.stringify(XLSX.utils.sheet_to_json(read.Sheets[read.SheetNames[0]]));
          const data = JSON.parse(jsonData);
          observer.next({ error: 0, msg: '', data });
          observer.complete();
        };
      } else {
        observer.next({ error: 1, msg: '格式不正确', data: [] });
      }
      reader.onerror = error => observer.error(error);
    });
  }

  /**
   * 列名和key转换
   * 用于导出时的数据转换
   */
  keyToTitle = (from: string[], to: string[], data: any[]) => {
    return data.map(item => {
      // tslint:disable-next-line:prefer-const
      let row: any = {};
      from.forEach((f, i) => {
        row[to[i]] = item[f];
      });
      return row;
    });
  }

  /**
   * 传入aoa和merges信息合并单元格
   */
  public aoaToSheet = (aoa, merges) => {
    const sheet = XLSX.utils.aoa_to_sheet(aoa);
    sheet['!merges'] = [...merges];
    return sheet;
  }
}
