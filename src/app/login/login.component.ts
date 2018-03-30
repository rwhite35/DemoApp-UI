import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { ApiHttpService } from '../shared/apiservice/api-http.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

	public user: string;
	public password: string;
	private data: any[] = [];
	
    constructor(
    	public router: Router,
    	private apiHttpService: ApiHttpService, 	// API HTTP Services
    ) {}

    ngOnInit() {}

    onLoggedin() {
    	// post validation
    	this.user = "demo";
    	this.password = "demo";
    	
    	//assign to data payload
    	this.data = [
    		this.user,
    		this.password
    	];
    	
    	console.log('login component test data ' + JSON.stringify(this.data));
    	
    	// make the api call
    	this.apiHttpService.processFormData(this.data);
    	
    	// localStorage.setItem('isLoggedin', 'true');
    }
}
