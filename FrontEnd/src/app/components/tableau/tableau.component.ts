import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
  MatTableDataSource, MatTableModule
} from '@angular/material/table';
import { Terrain } from '../../modele/terrain';
import { terrainService } from '../../service/terrainService';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatButton} from '@angular/material/button';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {TerrainUpdateDialogComponent} from '../dialog/terrain-update-dialog/terrain-update-dialog.component';
import {TerrainDeleteDialogComponent} from "../dialog/terrain-delete-dialog/terrain-delete-dialog.component";

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInput, MatButton, MatSortModule],
  templateUrl: './tableau.component.html',
  styleUrl: './tableau.component.css'
})
export class TableauComponent implements AfterViewInit{
  displayedColumns: string[] = ['nom', 'quantite', 'description', 'point_geo', 'Modifier', 'Supprimer'];
  terrainsSource!: MatTableDataSource<Terrain>;
  terrainsDataArray: Terrain[]= [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private readonly servTerrain: terrainService, private dialog:MatDialog) {
  }

  ngAfterViewInit(): void {
    this.updateDataSource()
  }

  onUpdate(terrain : Terrain){
    let dialogRef = this.dialog.open(TerrainUpdateDialogComponent, {
      height: '450px',
      width: '500px',
      data:terrain,
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.updateDataSource();
    })
  }


  onDelete(terrain : Terrain){
    let dialogRef = this.dialog.open(TerrainDeleteDialogComponent, {
      height: '450px',
      width: '500px',
      data:terrain,
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.updateDataSource();
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.terrainsSource.filter = filterValue.trim().toLowerCase();
  }


  updateDataSource(){
    this.servTerrain.getAllTerrain().subscribe({
      next:(data)=>{
        this.terrainsDataArray=data;
        this.terrainsSource= new MatTableDataSource<Terrain>(this.terrainsDataArray);
      },
      error: (err)=> {
        console.log(err);
      },
      complete: ()=>{
        this.terrainsSource.sort=this.sort;
        this.terrainsSource.paginator=this.paginator;
        this.terrainsSource.filterPredicate=function (data, filter:string) : boolean{
          return data.nom.toLowerCase().includes(filter);
        }
        console.log("Data loaded successfully");}
    });

  }
}
