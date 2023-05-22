import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'keyword'
})
export class KeywordPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(val: string, keyword: string): any {
    if (keyword !== null && keyword !== '') {
      const reg = new RegExp(keyword, 'i');
      if (val) {
        const res = val.replace(reg, `<mark>${keyword}</mark>`);
        return this.sanitizer.bypassSecurityTrustHtml(res);
      }
    } else {
      return val;
    }
  }

}
