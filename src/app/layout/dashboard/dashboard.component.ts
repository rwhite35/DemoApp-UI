import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];   // stubbed for later
    public sliders: Array<any> = [];  // stubbed for later
    public xid: any;

    constructor() {
      // set the client users xid
      this.xid = (localStorage.getItem('isLoggedin')) ? localStorage.getItem('xid') : null;
      /*
       *
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            }
        );
        this.alerts.push(
            {
                id: 0,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
       * 
       */
    }

    ngOnInit() {}

    /**
     * stubbed for later when alerts and error reporting is fully implemented.
     */
    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
  
}
