// deals.component.ts


import { Component, OnInit , ElementRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from '../confrm-dialog/confrm-dialog.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Chart,registerables} from 'chart.js';
import { ChartServiceService } from '../chartservice/chart-service.service';
Chart.register(...registerables);
import { LeadService } from '../lead.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
 
  constructor(private router: Router, 
            private _dialog:MatDialog,
            private _router:Router,
            private _http:HttpClient, 
            private el: ElementRef) {}

  ngOnInit(): void {}

  openDialog():void{
    const dialogRef = this._dialog.open(ConfrmDialogComponent);

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this._router.navigateByUrl('/login');
      }
    })
  }
  scrollToFormSection() {
    // Get a reference to the "About" section by its ID (assuming the ID is 'formSection')
    const formSection = this.el.nativeElement.querySelector('#formSection');
  
    // Scroll to the "About" section
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  

  navigateToLeadPage():void{
    this._router.navigateByUrl('/lead');
  }

  navigateToSettingsPage():void{
    this._router.navigateByUrl('/settings');
  }

  navigateToInvoicePage():void{
    this._router.navigateByUrl('/invoice');
  }

  navigateToDashboard():void{
    this._router.navigateByUrl('/dashboard');
  }

  
}
