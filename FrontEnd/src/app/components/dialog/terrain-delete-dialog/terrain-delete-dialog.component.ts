import {Component, inject, Inject, OnInit} from '@angular/core';
import {MatInput} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {Terrain} from '../../../modele/terrain';
import {terrainService} from '../../../service/terrainService';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-terrain-delete-dialog',
  standalone: true,
  imports: [
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './terrain-delete-dialog.component.html',
  styleUrl: './terrain-delete-dialog.component.css'
})
export class TerrainDeleteDialogComponent implements OnInit{
  deleteForm = new FormGroup({
    nom: new FormControl({value:'', disabled:true }),
    quantite: new FormControl({value:'', disabled:true }),
    description: new FormControl({value:'', disabled:true }),
    point_geo: new FormControl({value:'', disabled:true }),
  });
  terrainToDelete!:Terrain;
  idToDelete !: number;
  private _snackBar = inject(MatSnackBar);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Terrain,private readonly servTerrain: terrainService, public dialogRef: MatDialogRef<TerrainDeleteDialogComponent>) {
    this.terrainToDelete=data;
  }

  ngOnInit() {
    this.deleteForm.controls['nom'].setValue(this.terrainToDelete.nom);
    this.deleteForm.controls['description'].setValue(String(this.terrainToDelete.description));
    this.deleteForm.controls['quantite'].setValue(String(this.terrainToDelete.quantite));
    this.deleteForm.controls['point_geo'].setValue(String(this.terrainToDelete.point_geo));
  }

  onSubmit(){
    this.idToDelete= this.terrainToDelete.id;
    this.servTerrain.deleteTerrain(this.idToDelete).subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        this._snackBar.open("Terrain supprimé avec succès","Ok",{duration: 3000});
      }
    })
    this.dialogRef.close();
  }

}
