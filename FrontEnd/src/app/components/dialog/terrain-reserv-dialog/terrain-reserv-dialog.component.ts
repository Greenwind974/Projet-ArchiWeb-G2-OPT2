import {Component, inject, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Terrain} from '../../../modele/terrain';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {UtilisateurService} from '../../../service/utilisateurService';
import {Reservation} from '../../../modele/reservation';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-terrain-reserv-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogClose,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './terrain-reserv-dialog.component.html',
  styleUrl: './terrain-reserv-dialog.component.css'
})
export class TerrainReservDialogComponent implements OnInit{
  reservForm = new FormGroup({
    nom: new FormControl({value:'', disabled:true }),
    quantite: new FormControl({value:'', disabled:true }),
    description: new FormControl({value:'', disabled:true }),
    point_geo: new FormControl({value:'', disabled:true }),
  });
  terrainToReserv!:Terrain;
  private _snackBar = inject(MatSnackBar);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Terrain,private readonly userServ: UtilisateurService,public dialogRef: MatDialogRef<TerrainReservDialogComponent>) {
    this.terrainToReserv=data;
  }
  ngOnInit() {
    this.reservForm.controls['nom'].setValue(this.terrainToReserv.nom);
    this.reservForm.controls['description'].setValue(String(this.terrainToReserv.description));
    this.reservForm.controls['quantite'].setValue(String(this.terrainToReserv.quantite));
    this.reservForm.controls['point_geo'].setValue(String(this.terrainToReserv.point_geo));
  }

  onSubmit() : void {
    let newReserv : Reservation = {
      utilisateur_id:0,
      terrain_id:this.terrainToReserv.id,
    }
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      newReserv.utilisateur_id = parseInt(userId);
    }
    else {
      console.error("userId not found in sessionStorage");
    }

    if(sessionStorage.getItem("userId") != null) {
      this.userServ.reserver(newReserv).subscribe({
        next: (value) => {
          console.log("reservation effectuée")
        },
        error:(err)=>{
          console.log(err);
        },
        complete:()=>{
          this._snackBar.open("Terrain réservé avec succès","Ok",{duration: 3000});
        }
      });
    }
    else console.log('Impossible de réserver')
    this.dialogRef.close();
  }

}
