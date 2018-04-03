/**
 * ConfigComponent
 * Defines methods for acccessing Config Service
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from './config.service';


@Component({
    selector: 'app-config',  // the selector to create
    templateUrl: './config.component.html', // the data to bind
    styleUrls: ['./config.component.scss'] // the style to apply
})
export class ConfigComponent
{
  
    /*
     * API Configurations Object
     */
    apiConfigs: Object;
  
    constructor(
          private apiConfigService: ConfigService,
      ) {
    }
  
    /*
     * Loads last after all data bindings have occured.
     */
    ngOnInit() {}
  
  /**
   * showConfig
   * ConfigComponent subscribes to the getConfig()' return value. 
   * The subscription callback copies the data fields 
   * into the component's config object
   */
  public showConfig() {
    this.apiConfigService.getConfig()
      .subscribe(data => this.apiConfigs = {
        apiEndpoint: data['login'][0]['enpoint'],
        apiKey: data['login'][0]['key']
      });
    console.log('ConfigComponent showConfig has apiEndpoint' + JSON.stringify(this.apiConfigs));
  }
  
}