import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {Router} from '@angular/router';
import {UtilisateurService} from '../../../service/utilisateurService';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-deconnect-dialog',
  standalone: true,
    imports: [
        MatButton,
        MatDialogClose
    ],
  templateUrl: './deconnect-dialog.component.html',
  styleUrl: './deconnect-dialog.component.css'
})
export class DeconnectDialogComponent implements OnInit{
  private _snackBar = inject(MatSnackBar);

  constructor(public dialogRef: MatDialogRef<DeconnectDialogComponent>, private router: Router, private readonly servUser: UtilisateurService) {
  }
  ngOnInit() {
  }

  onSubmit() : void {
    this.servUser.deconnection();
    window.location.href=``;
    this.dialogRef.close();
    this._snackBar.open("Utilisateur déconnecté","Ok",{duration: 3000});

  }

}
