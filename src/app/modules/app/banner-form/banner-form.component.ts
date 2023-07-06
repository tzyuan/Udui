import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.scss']
})
export class BannerFormComponent implements OnInit {
  @Input() editData: any = null;
  @Input() showDetail: boolean = false;
  constructor(
    private http: HttpClient,
    private drawerRef: NzDrawerRef<string>,
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }
  loading = false;
  bannerForm = this.fb.group({
    img_url: [null, [Validators.required]],
    content: [null, [Validators.required]],
  });

  fileList: any[] = [];
  uploadChange = (e: NzUploadChangeParam) => {
    if (e.type === 'success') {
      this.bannerForm.get('img_url')?.setValue(e.file.response.img_url);
    }
    if (e.type === 'error') {
      this.message.error('文件上传失败,请重新上传');
      this.bannerForm.get('img_url')?.setValue(null);
    }
  }

  removeFile = () => {
    this.bannerForm.get('img_url')?.reset();
  }
  _submitForm = () => {
    if (this.bannerForm.value.img_url == null) {
      this.message.error('请上传图片');
      return;
    }
    if (this.bannerForm.value.content == null || `${this.bannerForm.value.content}`.trim() == '') {
      this.message.error('请填写内容');
      return;
    }
    this.loading = true;
    if (this.editData == null) {
      this.http.post('/admin/banners', this.bannerForm.value).subscribe(res => {
        this.message.success('保存成功');
        this.drawerRef.close(true);
        this.loading = false;
      });
    } else {
      this.http.patch(`/admin/banners/${this.editData.id}`, this.bannerForm.value).subscribe(res => {
        this.message.success('保存成功');
        this.drawerRef.close(true);
        this.loading = false;
      });
    }
  }
  ngOnInit(): void {
    if (this.editData != null) {
      this.bannerForm.setValue({
        img_url: this.editData.img_url,
        content: this.editData.content
      });
      this.fileList = [{
        uid: '-1',
        name: this.editData.img_url,
        status: 'done',
        url: this.editData.img_url,
      }]
    }
  }

}
