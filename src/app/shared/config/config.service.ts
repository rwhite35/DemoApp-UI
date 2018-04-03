import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {

  /*
   * path to API configurations
   */
  configUri = 'assets/config.json';

  constructor(
    private http: HttpClient
  ) { }
  
  /*
   * getter method for loading the configurations
   * uses HttpClient to call an internal route.
   */
  public getConfig() 
  {
    console.log('config.services getting configs ' + JSON.stringify(this.configUri));
    return this.http.get(this.configUri);
  }
  
}