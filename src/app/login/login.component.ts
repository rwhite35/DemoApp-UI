import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import { FormBuilder, Validators } from '@angular/forms';

// uses ApiHttpService to call API endpoints
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
   * FormBuilder manages the FormGroup construction, no need to manually 
   * construct each input control at least for the login form.
   */
  private formData = this.formBuilder.group({
    user: ['', Validators.required],
    password: ['', Validators.required],
    token: ['']
  });
  private service: string;
  public requestDate: any[] = [];
  public response: any;

  constructor(
    public router: Router,
    private apiHttpService: ApiHttpService, 	   // API HTTP Services
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  /*
   * onLoggedin
   * On Submit event, calls this method. Assigns form fields to formData object.
   */
  onLoggedin(event) {
    // get login form data
    this.requestDate = [
      this.formData.value.user,
      this.formData.value.password,
      this.formData.value.token
     ];
    
    // Login/POST authenticates the user, creates an entry and sets the users XID
    this.service = 'login';
    // make the api call, routes to access-denied on fail, dashboard on susccess
    this.apiHttpService.processFormData(this.requestDate, this.service);
  }

}
