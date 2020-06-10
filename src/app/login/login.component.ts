import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // FORM
  form: FormGroup;
  user: User;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    });
  }

  login(){
    console.log(this.form.value);
    this.user = new User(this.form.value.username, this.form.value.password);
    console.log(this.user);
  }

  // METODO ERRORES //
  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

}
