import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import { FormBuilder, Validators } from '@angular/forms';

import {ApiHttpService} from '../shared/apiservice/api-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  /*
   * {sting} Client User Name
   */
  private user: string;
  /*
   * {string} Client User password
   */
  private password: string;
  /*
   * {string} Form JWT or OAuth token
   */
  private token: string;
  /*
   * {object} Form data from FormBuilder
   * FormBuilder manages the FormGroup construction,
   * no need to manually construct each input control,
   * at least for the login form.
   */
  private formData = this.formBuilder.group({
    user: ['', Validators.required],
    password: ['', Validators.required],
    token: ['']
  });
  private method: string;
  public requestDate: any[] = [];
  public response: any;

  constructor(
    public router: Router,
    private apiHttpService: ApiHttpService, 	   // API HTTP Services
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  /*
   * On Submit event, calls this method
   * Assigns form fields to formData object.
   */
  onLoggedin(event) {
    console.log('onLoggedin clicked, passing user name ' + 
      JSON.stringify(event));
    
    // post validation
    this.requestDate = [
      this.formData.value.user,
      this.formData.value.password,
      this.formData.value.token
     ];
    
    // this.method = 'GET';
    this.method = 'POST';
   
    // make the api call
    this.apiHttpService.processFormData(this.requestDate, this.method);
  }

}
