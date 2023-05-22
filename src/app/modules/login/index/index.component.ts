
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
  }
  loading = false;
  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    googlecode: [null, [Validators.required]],
  });

  onSubmit = () => {

  }

  ngOnInit() {
    this.router.navigate(['/order']);
    console.log('loginInit');
  }

}
