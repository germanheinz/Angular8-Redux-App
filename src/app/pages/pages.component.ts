import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user.model';
import * as authAction from '../store/actions/auth.actions';
import * as clientAction from '../store/reducers/auth.reducer';
import * as actions from '../store/actions';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  ngOnInit(): void {

    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user){
      console.log(this.user);
      // this.store.dispatch(authAction.setUser({user: this.user}));
      // this.store.dispatch(actions.setUser());
    }

  }



}
