import {Component, Inject, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Reservation} from '../../../modele/reservation';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {UtilisateurService} from '../../../service/utilisateurService';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-reserv-delete-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './reserv-delete-dialog.component.html',
  styleUrl: './reserv-delete-dialog.component.css'
})
export class ReservDeleteDialogComponent implements OnInit{
  deleteResaForm = new FormGroup({
    user: new FormControl({value:'', disabled:true }),
    terrain: new FormControl({value:'', disabled:true }),
  });

  resaToDelete!:Reservation;
  private _snackBar = inject(MatSnackBar);
  constructor(@Inject(MAT_DIALOG_DATA) public data: Reservation,private readonly servUser: UtilisateurService, public dialogRef: MatDialogRef<ReservDeleteDialogComponent>) {
    this.resaToDelete=data;
  }

  ngOnInit() {
    this.deleteResaForm.controls['user'].setValue(String(this.resaToDelete.utilisateur_id));
    this.deleteResaForm.controls['terrain'].setValue(String(this.resaToDelete.terrain_id));
    }

  onSubmit(){
    this.servUser.supprimerReservation(this.resaToDelete).subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        this._snackBar.open("Réservation supprimée avec succès","Ok");
      }
    })
    this.dialogRef.close();
  }
}
