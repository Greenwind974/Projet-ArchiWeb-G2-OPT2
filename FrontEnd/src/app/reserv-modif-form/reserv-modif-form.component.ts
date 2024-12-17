import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../service/utilisateurService';
import { Terrain } from '../modele/terrain';
import { terrainService } from '../service/terrainService';

@Component({
  selector: 'app-reserv-modif-form',
  standalone: true,
  imports: [],
  templateUrl: './reserv-modif-form.component.html',
  styleUrl: './reserv-modif-form.component.css'
})
export class ReservModifFormComponent implements OnInit{

  currentTerrain!: Terrain;

  ListeTerrain!: Terrain[]

  constructor(
    private readonly userServ : UtilisateurService,
    private readonly terrainServ : terrainService
  ) {
  }

  ngOnInit() {
    this.terrainServ.getAllTerrain().subscribe(value => {
      for( let i = 0 ; i < value.length ; i++) {
        this.ListeTerrain.push(value[i])
      }
    })
  }

  getTerrainInfo(id : number) : void{
    let currentTerrain : Terrain;
    if(id != null){
      this.terrainServ.getTerrainById(id).subscribe(value => {this.currentTerrain = value})
      console.log(this.currentTerrain)
    }
  }

  ModifierReservation() {
    
  }



}
