import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LeadData } from '../home/data.model';
import { LeadService } from '../lead.service';

@Component({
  selector: 'app-lead-edit-dialog',
  templateUrl: './lead-edit-dialog.component.html',
  styleUrls: ['./lead-edit-dialog.component.scss']
})
export class LeadEditDialogComponent {
  updatedLead: LeadData;
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LeadEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public lead: LeadData,
    private formBuilder: FormBuilder,
    private leadService: LeadService
  ) {
    this.updatedLead = { ...lead };

    this.editForm = this.formBuilder.group({
      FirstName: [this.updatedLead.FirstName],
      LastName: [this.updatedLead.LastName],
      email: [this.updatedLead.email],
      ContactNumber: [this.updatedLead.ContactNumber]
    });
  }

  onSaveClick(): void {
    if (this.editForm) {
      // Update the updatedLead with form values
      this.updatedLead.FirstName = this.editForm.get('FirstName')?.value || '';
      this.updatedLead.LastName = this.editForm.get('LastName')?.value || '';
      this.updatedLead.email = this.editForm.get('email')?.value || '';
      this.updatedLead.ContactNumber = this.editForm.get('ContactNumber')?.value || '';
  
      this.leadService.updateLead(this.updatedLead.id, this.updatedLead).subscribe(
        (response) => {
          console.log('Lead updated successfully:', response);
          this.dialogRef.close(this.updatedLead);
        },
        (error) => {
          console.error('Error updating lead:', error);
        }
      );
    }
  }
  

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
