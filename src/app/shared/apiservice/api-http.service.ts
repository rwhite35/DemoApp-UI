import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

// Authorization Basic
const token = 'Basic NWdeaPS1r3uZXZIFrQ/EOELxZFA=';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    // set this when OAuth is implemented.
    // 'Access-Control-Allow-Origin': '*' 
    // 'Authorization': token,
  })
};

const responseid = {};

@Injectable()
export class ApiHttpService {
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Process login input and called the API endpoint
   */
  public processFormData(formData: any[], method) {

    /** @TODO replace with config/config.provider */
    const requestUrl = 'http://localhost:8888/workspace/DemoApp/public/login';
    const apikey = '01f0462d-15d8-4fbc-b113-1d0e106b1135';

    // make the call to API Endpoint
    if (method === 'GET') {
        return this.httpGetRequest( requestUrl, apikey, formData );

    } else if (method === 'POST') {
        return this.httpPostRequest( requestUrl, apikey, formData );

    }
  }

  /*
   * HTTP GET Method
   * Pass in the id to get the the last record created
   */
  private httpGetRequest( requestUrl, apikey, formData ) {
    console.log('httpGetRequest called from ' +
      'processFormData method with request URL ' +
      requestUrl
    );
    // make the get call
    const res = this.http
      .get(requestUrl, httpOptions)
      .subscribe(
        val => {
          console.log('httpGetRequest result ' + val);
        },
        err => {
          console.log('Error httpGetRequest ' + err);
        }
      );
      console.log('res value is ' + res);
      return res;
    
  }
  
  /*
   * HTTP PUT Method
   * @return {string} responseid[id'] the API generated unique id for the each transaction
   */
  private httpPostRequest(requestUrl, apikey, formData) {
    
    this.http.post(requestUrl, {
          'user': formData[0],          // user name
          'password': formData[1],      // password
          'message': 'This is test data.',
      }, httpOptions)
      .subscribe(
        (val) => {
          // assign response id to user for authenticationed validation
          if ( val.hasOwnProperty('id').valueOf ) {
            console.log('httpPostRequest returned response id ' + val['id']);
            // save logged in XID
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('xid', val['id']);
            // navigate to dashboard
            this.router.navigate(['/dashboard']);
          }
       },
       () => {
          console.log('Post observable is now complete.');
       });
  }

}
