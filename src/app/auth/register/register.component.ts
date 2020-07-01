import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../store/actions/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

   // FORM
   form: FormGroup;
   user: User;

  loading: boolean = false;
  uiSubscription: Subscription;

  constructor(private authService: AuthService, private route: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email:    new FormControl('', [Validators.required, Validators.email])
    });
    this.uiSubscription = this.store.select('ui').subscribe(ui => { this.loading = ui.isLoading; });
  }
  // IMPLEMENT ON DESTROY TO CLEAN MEMORY
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }


  register(){
    console.log(this.form.value);
    // DISPATCH ACTION
    this.store.dispatch(ui.isLoading());

    if (this.form.invalid) { return; }

    this.user = new User(this.form.value.username, this.form.value.password);
    this.user.email = this.form.value.email;

    this.authService.register(this.form.value).subscribe(resp => {

      // DISPATCH ACTIONS
      this.store.dispatch(ui.stopLoading());

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

      // DISPATCH ACTIONS
      this.store.dispatch(ui.stopLoading());

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
