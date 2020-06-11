import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
      email:    new FormControl('', [Validators.required, Validators.email])
    });
  }


  register(){
    console.log(this.form.value);
    if (this.form.invalid) { return; }

    this.user = new User(this.form.value.username, this.form.value.password);
    this.user.email = this.form.value.email;

    this.authService.register(this.form.value).subscribe(resp => {
      console.log(resp);
      let timerInterval;
      Swal.fire({
        title: 'We are Creating a new User..',
        timer: 2000,
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getContent();
            if (content) {
              const b = content.querySelector('b');
            }
          }, 100);
        },
        onClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer');
        }
      });
      this.route.navigate(['/']);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! ' + this.form.value.username + ' is not a valid User',
      });
    });

    console.log(this.user);
  }
  // METODO ERRORES //
  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

}
