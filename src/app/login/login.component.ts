import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // FORM
  form: FormGroup;
  user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form  =  new FormGroup({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    });
  }

  login(){
    console.log(this.form.value);
    this.user = new User(this.form.value.username, this.form.value.password);
    console.log(this.user);

    this.authService.login(this.user).subscribe(resp => {
      console.log(resp);

      this.authService.saveUser(resp.access_token);
      this.authService.saveToken(resp.access_token);

      this.router.navigate(['/']);
      Swal.fire({
        icon: 'success',
        title: 'Welcome ' + this.form.value.username,
        showConfirmButton: false,
        timer: 1000
      });
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! ' + this.form.value.username + ' is not a valid User',
      });
    });
  }

  // METODO ERRORES //
  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

}
