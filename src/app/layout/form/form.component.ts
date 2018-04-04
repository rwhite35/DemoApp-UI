import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import { routerTransition } from '../../router.animations';
import { FormBuilder, Validators } from '@angular/forms';

// uses ApiHttpService to call API endpoints
import {ApiHttpService} from '../../shared/apiservice/api-http.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class FormComponent implements OnInit {
  /*
   * {int} Route Guide Order ID
   */
  private orderId: string;
  /*
   * {int} Client ID
   */
  private clientId: string;
  /*
   * {string} Form JWT,OAuth token
   */
  private token: string;
  
  private xid: string;
  /*
   * {object} Form data from FormBuilder
   * FormBuilder manages the FormGroup construction, no need to manually 
   * construct each input control for Route Guide.
   */
  public formData = this.formBuilder.group({
    orderId: ['', Validators.required],
    clientId: ['', Validators.required],
    token: ['']
  });
  public service: string;
  public requestDate: any[] = [];
  public response: any;

  constructor(
    public router: Router,
    private apiHttpService: ApiHttpService, 	   // API HTTP Services
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // set the client users xid
    this.xid = (localStorage.getItem('isLoggedin')) ? localStorage.getItem('xid') : null;
  }

  /*
   * onLoggedin
   * On Submit event, calls this method. Assigns form fields to formData object.
   */
  onSubmit(event) {
    // get Route Order form data
    this.requestDate = [
      this.formData.value.orderId,
      this.formData.value.clientId,
      this.xid
     ];
    
    // Login/POST authenticates the user, creates an entry and sets the users XID
    this.service = 'routeguide';
    // make the api call, routes to access-denied on fail, dashboard on susccess
    this.apiHttpService.processFormData(this.requestDate, this.service);
  }

}
