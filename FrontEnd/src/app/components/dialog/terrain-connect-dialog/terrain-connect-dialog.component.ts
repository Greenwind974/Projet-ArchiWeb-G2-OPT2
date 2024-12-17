import {Component, OnInit} from '@angular/core';
import {MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-terrain-connect-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogClose
  ],
  templateUrl: './terrain-connect-dialog.component.html',
  styleUrl: './terrain-connect-dialog.component.css'
})
export class TerrainConnectDialogComponent implements OnInit{


  constructor(public dialogRef: MatDialogRef<TerrainConnectDialogComponent>, private router: Router) {
  }
  ngOnInit() {
    }

  onSubmit() : void {
    this.router.navigateByUrl(`user-login`);
    this.dialogRef.close();

  }
}
