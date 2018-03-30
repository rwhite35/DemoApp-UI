import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ApiHttpService } from '../shared/api-http.service';


@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {

  public emailform: FormGroup;
  public firstName: FormControl;
  public lastName: FormControl;
  public email: FormControl;
  public password: FormControl;
  public data: any[] = [];

  constructor(
  		private apiHttpService: ApiHttpService, 	// API HTTP Services
  ){}

  get nameFields(): FormArray { return this.emailform.get('name') as FormArray; }
  get emailField(): any { return this.emailform.get('email'); }
  get passwordField(): any { return this.emailform.get('password'); }

  ngOnInit() {
  	this.createFormControls();
  	this.createForm();
  }
  
  /**
  * define field and validation for each form control
  */
  public createFormControls() {
  		this.firstName = new FormControl('', Validators.required);
  		this.lastName = new FormControl('', Validators.required);
  		this.email = new FormControl('', [
  			Validators.required,
  			Validators.pattern("[^ @]*@[^ @]*")
  			]);
  		this.password = new FormControl('', [
  			Validators.minLength(4),
  			Validators.required
  			]);
  }
  	
  /**
   * create the instance of the form and assign input controls to it
   */
  public createForm() {
  	this.emailform = new FormGroup({
  		name: new FormGroup({
  			firstName: this.firstName,
  			lastName: this.lastName,
  		}),
  		email: this.email,
  		password: this.password
  	});
  }
  
  /**
   * validate input and pass to backend 
   */
   public validateSendForm() {
   		this.data = this.nameFields.value;
   		this.data.email = this.emailField.value;
   		this.data.password = this.passwordField.value;
   		
   		console.log('data value ' + JSON.stringify(this.data));
   		console.log('form status ' + this.emailform.status);
   		
   		this.apiHttpService.processFormData(this.data);
   }
  	
}
