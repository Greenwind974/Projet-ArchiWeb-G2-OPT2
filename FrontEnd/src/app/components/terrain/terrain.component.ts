import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
  MatTableDataSource, MatTableModule
} from '@angular/material/table';
import { Terrain} from '../../modele/terrain';
import { terrainService } from '../../service/terrainService';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import { UtilisateurService } from '../../service/utilisateurService';
import {MatButton} from '@angular/material/button';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {TerrainReservDialogComponent} from '../dialog/terrain-reserv-dialog/terrain-reserv-dialog.component';
import {TerrainConnectDialogComponent} from '../dialog/terrain-connect-dialog/terrain-connect-dialog.component';

@Component({
  selector: 'app-terrain',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInput, MatButton, MatSort, MatSortHeader],
  templateUrl: './terrain.component.html',
  styleUrl: './terrain.component.scss'
})
export class TerrainComponent implements AfterViewInit{
  displayedColumns: string[] = ['nom', 'quantite', 'description', 'point_geo', 'reserver'];
  terrainsSource!: MatTableDataSource<Terrain>;
  terrainsDataArray: Terrain[]= [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;


  constructor(private readonly servTerrain: terrainService,
              private readonly userServ: UtilisateurService,
              private dialog:MatDialog
              ) {}



  ngAfterViewInit(): void {
    this.updateDataSource()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.terrainsSource.filter = filterValue.trim().toLowerCase();
  }

  reservTerrain(terrain : Terrain) : void {
    if(sessionStorage.getItem("userId") != null){
      let dialogRef = this.dialog.open(TerrainReservDialogComponent, {
        height: '450px',
        width: '500px',
        data:terrain,
      });
      dialogRef.afterClosed().subscribe(result=>{
        this.updateDataSource();
      })
    }
    else{
      let dialogRef = this.dialog.open(TerrainConnectDialogComponent, {
        height: '200px',
        width: '400px',
        data:terrain,
      });
      dialogRef.afterClosed().subscribe(result=>{
        this.updateDataSource();
      })
      console.error("userId not found in sessionStorage");
    }

  }

  updateDataSource() {
    this.servTerrain.getAllTerrain().subscribe({
      next: (data) => {
        this.terrainsDataArray = data;
        this.terrainsSource = new MatTableDataSource<Terrain>(this.terrainsDataArray);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.terrainsSource.sort = this.sort;
        this.terrainsSource.paginator = this.paginator;
        this.terrainsSource.filterPredicate = function (data, filter: string): boolean {
          return data.nom.toLowerCase().includes(filter);
        }
        console.log("Data loaded successfully");
      }
    });

  }}
