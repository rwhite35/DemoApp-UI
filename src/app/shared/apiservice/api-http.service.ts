import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

/** @TODO replace with config/config.provider */
const host = 'http://localhost:8888/workspace/DemoApp/public/';
const apikey = '01f0462d-15d8-4fbc-b113-1d0e106b1135';

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
   * Acts as a routing method which configures the API URL
   * and call the method passed as the "service" to hit.
   */
  public processFormData(formData: any[], service) {
    
    let url: string;
    
    // Call to UI's API service resources
    // fetchAll GET request
    if (service === 'fetchall') {
        url = host + 'login';
        return this.httpGetRequest( url, apikey, formData );
      
    // create (new user Entity) POST request
    } else if (service === 'login') {
        url = host + 'login';
        return this.httpPostRequest( url, apikey, formData );
      
    // fetch a route guide by order id  
    } else if (service === 'routeguide') {
        url = host + 'route-guide/' + formData[2];
        return this.httpFetchRequest( url, apikey, formData);
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
   * Login Service HTTP POST request method
   * @return {string} eXternal User Id (XID) generated for the each authenticated user
   */
  private httpPostRequest(requestUrl, apikey, formData) {
    
    let status: number;
    
    this.http.post(requestUrl, {
          'user': formData[0],          // user name
          'password': formData[1],      // password
          'message': '',                // API response message
      }, httpOptions)
      .subscribe(
        (val) => {
          // check for errors coming back from API
          if ( val['message']['error_code'] ) {
            console.log('httpPostRequest returned errors ' + val['message']['error_message']);
            status = val['message']['error_code'];    // 401

            // 401 - route to access-denied
            this.router.navigate(['/access-denied']);

          } // check for XID and assign to localStoreage
          else if ( val.hasOwnProperty('id').valueOf ) {
            console.log('httpPostRequest returned external id (XID) ' + val['id']);
            
            // save API XID to localStorage
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('xid', val['id']);
            status = 0;   // success

            // route to dashboard
            this.router.navigate(['/dashboard']);
          }
       },
       () => {
          console.log( 'Post observable is now completed with status ' + status );
       });

      return status;
  }
  
  /**
   * HTTP FETCH Method
   * Fetch an item by its item id.  Example order_id
   */
  private httpFetchRequest(requestUrl, apikey, formData) {
    console.log('httpFetchRequest called from ' +
      'processFormData method with request URL ' +
      requestUrl + ' and formData orderId ' + formData[0]
    );

    const res = this.http
      .get(requestUrl, httpOptions)
      .subscribe(
        val => {
          console.log('httpGetRequest result ' + val['user']);
          console.log('httpFetchRequest timestamp ' + val['timestamp']);
          console.log('httpFetchRequest oid ' + val['oid']);
        },
        err => {
          console.log('Error httpGetRequest ' + err);
        }
      );

      return res;
  }

}
