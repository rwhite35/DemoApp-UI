import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0ODQ2NzY4MjEsImlhdCI6MTQ4MzQ2NzIyMSwic3ViIjoyfQ.hMcrXz-63iD4jX-ves3cZMznSS3UhZD4NCPry2zLkHo';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': token
	});
}

@Injectable()
export class ApiHttpService {
	
	constructor(private http:HttpClient){}
	
	public processFormData(formData: any[]): Observable<any> {
		const method = 'post';
		const requestUrl = 'http://localhost:8888/workspace/solidmail/public/';
		
		console.log('getFormData data ' + JSON.stringify(formData));
		
		return this.httpWrapperRequest(method, requestUrl, formData);
		
	}
	
	private httpWrapperRequest(method, requestUrl, formData) {
	
		console.log('formData value ' + JSON.stringify(formData));
		
		// HTTP Method POST
		const res = this.http.post(requestUrl, {
			'title': 'input data',
			'data': formData,
		}, httpOptions)
		.subscribe(
        	res => {
          		console.log(res);
        	},
        	err => {
          		console.log('Error occured');
        	}
      	);
      	
		// console.log('api request ' + JSON.stringify(res));
		
		return res;
	}
}
