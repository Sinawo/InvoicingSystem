
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ConfrmDialogComponent } from '../confrm-dialog/confrm-dialog.component';

import { BreakpointObserver } from '@angular/cdk/layout';

import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DataService } from '../data.service';


@ViewChild(MatSidenav)
@UntilDestroy()
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{
  
  constructor(private _dialog:MatDialog,
    private _router:Router, private el: ElementRef,
    private observer: BreakpointObserver, private router: Router,
    private dataService: DataService
  
    ){}

sidenav!: MatSidenav;
ngOnInit(): void {

  //fetch all the clients
  
 
  }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  openDialog():void{
    const dialogRef = this._dialog.open(ConfrmDialogComponent);

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this._router.navigateByUrl('/login');
      }
    })
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
