import {Component, inject, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {Terrain} from '../../../modele/terrain';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms'
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {terrainService} from '../../../service/terrainService';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-terrain-update-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatIcon,
    ReactiveFormsModule,
    MatLabel,
    FormsModule,
    MatButton,
    MatDialogClose,
  ],
  templateUrl: './terrain-update-dialog.component.html',
  styleUrl: './terrain-update-dialog.component.css'
})
export class TerrainUpdateDialogComponent implements OnInit{
  terrainToUpdate!: Terrain;
  updateTerrain!:Terrain;
  updateForm = new FormGroup({
    nom: new FormControl(''),
    quantite: new FormControl(''),
    description: new FormControl(''),
    point_geo: new FormControl(''),
  });
  private _snackBar = inject(MatSnackBar);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Terrain,private readonly servTerrain: terrainService, public dialogRef: MatDialogRef<TerrainUpdateDialogComponent>, ) {
    this.terrainToUpdate=data;
  }
  ngOnInit() {
    this.updateForm.controls['nom'].setValue(this.terrainToUpdate.nom);
    this.updateForm.controls['description'].setValue(this.terrainToUpdate.description);
    this.updateForm.controls['quantite'].setValue(String(this.terrainToUpdate.quantite));
    this.updateForm.controls['point_geo'].setValue(this.terrainToUpdate.point_geo);

  }
  onSubmit(){
    this.updateTerrain={
      id:this.terrainToUpdate.id,
      nom:this.updateForm.controls['nom'].value as string,
      quantite:Number(this.updateForm.controls['quantite'].value),
      description:this.updateForm.controls['description'].value as string,
      point_geo:this.updateForm.controls['point_geo'].value as string
    };

    this.servTerrain.updateTerrain(this.terrainToUpdate.id, this.updateTerrain).subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
        },
      complete:()=>{
        this._snackBar.open("Terrain modifié avec succès","Ok",{duration: 3000});
      }
    })

    this.dialogRef.close();


  }


}
