import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   // FORM
   form: FormGroup;
   user: User;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email:    new FormControl('', [Validators.required])
    });
  }


  register(){
    console.log(this.form.value);
    if (this.form.invalid) { return; }

    this.user = new User(this.form.value.username, this.form.value.password);
    this.user.email = this.form.value.email;
    
    this.authService.register(this.form.value).subscribe(resp => {
      console.log(resp);
      this.route.navigate(["/"]);
    });
    
    console.log(this.user);
  
  }
  // METODO ERRORES //
  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

}
