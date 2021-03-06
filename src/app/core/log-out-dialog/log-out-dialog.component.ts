import { Component, OnInit, Inject, OnDestroy, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Logout } from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';

@Component({
  selector: 'app-log-out-dialog',
  templateUrl: './log-out-dialog.component.html',
  styleUrls: ['./log-out-dialog.component.scss']
})
export class LogOutDialogComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<LogOutDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>) { }

  private _autoLogout: any;
  public countDown: number;

  ngOnInit() {
    const updateInterval = 1000;
    this.countDown = this.data.expiryDate - Date.now();
    this._autoLogout = setInterval(() => {
      if (this.countDown <= 0) {
        this.store.dispatch(new Logout());
      } else {
        this.countDown -= updateInterval;
      }
    }, updateInterval);
  }

  ngOnDestroy(): void {
    clearInterval(this._autoLogout);
  }

}
