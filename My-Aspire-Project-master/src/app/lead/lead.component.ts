import { Component, OnInit } from '@angular/core';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfrmDialogComponent } from '../confrm-dialog/confrm-dialog.component';
import { LeadService } from '../lead.service';


import { DataService } from '../data.service';
import { LeadData, QuoteData } from '../home/data.model';

import { LeadEditDialogComponent } from '../lead-edit-dialog/lead-edit-dialog.component'; 




@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent implements OnInit {
  leads: LeadData[] = []; 

  constructor(
    private _router:Router,
    private _dialog:MatDialog,
    private _leadService:LeadService,
    private leadService:LeadService,
    private dataService: DataService
    
    ){}

    ngOnInit(): void {

      this.fetchLeads();
      // Subscribe to the leads$ observable to receive updates
      this.dataService.leads$.subscribe((leads) => {
        this.leads = leads;
      });
     
    }
    

    
   
    editLead(leadId: number, updatedLead: LeadData) {
      // Implement edit logic here, e.g., update the lead using a service
      this._leadService.updateLead(leadId, updatedLead).subscribe(() => {
        // Update the local leads list with the edited lead
        const index = this.leads.findIndex(lead => lead.id === leadId);
        if (index !== -1) {
          this.leads[index] = updatedLead;
        }
      });
    }
    
    deleteLead(leadId: number) {
      // Implement delete logic here, e.g., delete the lead using a service
      this._leadService.deleteLead(leadId).subscribe(() => {
        // Remove the lead from the local leads list
        this.leads = this.leads.filter(item => item.id !== leadId);
      });
    }
    
    // LeadComponent

openEditLeadDialog(lead: LeadData): void {
  const dialogRef = this._dialog.open(LeadEditDialogComponent, {
    width: '400px',
    data: { ...lead } // Pass a copy of the lead data to the dialog
  });

  dialogRef.afterClosed().subscribe(updatedLead => {
    if (updatedLead) {
      console.log('Updated lead data:', updatedLead);

    
      const index = this.leads.findIndex(item => item.id === updatedLead.id);
      if (index !== -1) {
        this.leads[index] = updatedLead;
        console.log('Local leads list after update:', this.leads);
      }
    }
  });
}

    
  
    fetchLeads(): void {
      this._leadService.getLeads().subscribe((data: LeadData[]) => {
        this.leads = data;
      });
    }
    displayedColumns: string[] = ['name', 'email', 'contactNumber', 'edit', 'delete'];


  openAddLeadForm():void{
    const dialogRef = this._dialog.open(AddLeadComponent);
  }

  openDialog():void{
    const dialogRef = this._dialog.open(ConfrmDialogComponent);

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this._router.navigateByUrl('/login');
      }
    })
  }

  navigateToDashboard():void{
    this._router.navigateByUrl('/dashboard');
  }
  
  navigateToSettings():void{
    this._router.navigateByUrl('/settings');
  }

  navigateToLeadPage():void{
    this._router.navigateByUrl('/lead');
  }

  navigateToInvoicePage():void{

    this._router.navigateByUrl('invoice');

  }

  navigateToSettingsPage():void{
    this._router.navigateByUrl('/settings');

  }
}
