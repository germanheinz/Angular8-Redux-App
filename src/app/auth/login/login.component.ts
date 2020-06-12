import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  // FORM
  form: FormGroup;
  user: User;

  loading: boolean = false;
  uiSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form  =  new FormGroup({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    });
    this.uiSubscription = this.store.select('ui').subscribe(ui => { this.loading = ui.isLoading; });
  }

  // IMPLEMENT ON DESTROY TO CLEAN MEMORY
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  login(){
    // DISPATCH ACTION
      this.store.dispatch(ui.isLoading());

      this.user = new User(this.form.value.username, this.form.value.password);

      this.authService.login(this.user).subscribe(resp => {
      // console.log(resp);

      // SERVICES
      this.authService.saveUser(resp.access_token);
      this.authService.saveToken(resp.access_token);

      // DISPATCH ACTION
      this.store.dispatch(ui.stopLoading());
      this.router.navigate(['/']);

      Swal.fire({
        icon: 'success',
        title: 'Welcome ' + this.form.value.username,
        showConfirmButton: false,
        timer: 1000
      });
    }, error => {

      // DISPATCH ACTION
      this.store.dispatch(ui.stopLoading());

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
