import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatTableDataSource, MatTableModule
} from '@angular/material/table';
import { terrainService } from '../../service/terrainService';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UtilisateurService } from '../../service/utilisateurService';
import { Reservation } from '../../modele/reservation';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { catchError, map, of } from 'rxjs'
import {MatDialog} from '@angular/material/dialog';
import {ReservDeleteDialogComponent} from '../dialog/reserv-delete-dialog/reserv-delete-dialog.component';
import {MatButton} from '@angular/material/button';
import {TerrainConnectDialogComponent} from '../dialog/terrain-connect-dialog/terrain-connect-dialog.component';


@Component({
  selector: 'app-reserv-tableau',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatButton],
  templateUrl: './reserv-tableau.component.html',
  styleUrl: './reserv-tableau.component.scss'
})
export class ReservTableauComponent implements AfterViewInit, OnInit{

  displayedColumns: string[] = ['terrain_id', 'utilisateur_id', 'supprimer'];
  reservationSource!: MatTableDataSource<Reservation>;
  reservationDataArray: Reservation[]= [];
  listTerrain! : Map<number,string>;
  username!: string

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private readonly servTerrain: terrainService,
              private readonly userServ: UtilisateurService,
              private dialog:MatDialog
              ) {
                this.listTerrain = new Map<number, string>
              }
  ngOnInit(): void {
    this.servTerrain.getAllTerrain().subscribe(value => {
      for( let i = 0 ; i < value.length ; i++) {
        this.listTerrain.set(value[i].id, value[i].nom);
      }
    })
  }

  ngAfterViewInit(): void {
    this.updateDataSource();
  }


  updateDataSource(){
    const idSession = sessionStorage.getItem("userId")
    //Vérification de l'état du checkbox et de la connexion de l'utilisateur
    if(idSession != null)
    {
      this.userServ.getReservationByUserId(parseInt(idSession)).subscribe({
        next:(value) =>{
          this.reservationSource = new MatTableDataSource<Reservation>(value);
          this.reservationSource.paginator=this.paginator;}
      });

    }
    else {
      this.userServ.getAllReservation().subscribe({
        next:(value) =>{
        this.reservationSource = new MatTableDataSource<Reservation>(value);
        this.reservationSource.paginator=this.paginator;}
      }

      )
    }

  }


  getTerrainById(id : number) : string {
    let terrainName = this.listTerrain.get(id)
    if(terrainName != null) {
      return terrainName;
    }
    return ""
  }


//Méthodes demandé par Maxime, à modifier
  getUserName(id : number) : string {
    //Récupération de l'id dans sessionStorage
    //Action si id existant
    if(id != null) {
      this.userServ.getUserWithId(id).subscribe(value =>{this.username = value.username;
      })
    }
    return this.username
  }

  existUser(id : number) : boolean {
    let res = false;
    this.userServ.getUserWithId(id).pipe(map(
        //Transformation de l'entité en booléen
        (user) => user != null),
          //Renvoie de false en cas de mauvaise requête (utilisateur non existant)
          catchError((err) => { return of(false)}) ).subscribe((exists) => {
            //Affichage pour débuggage
      console.log(exists);
    })
    return res
  }

//Fin des méthodes de maxime

  suppressionResa(ter_id : number) : void {
    const tempUserId = sessionStorage.getItem("userId");
    let suppReserv : Reservation = {
      terrain_id:ter_id,
      utilisateur_id:0
    };
    if (tempUserId){
      suppReserv.utilisateur_id = parseInt(tempUserId);
      let dialogRef = this.dialog.open(ReservDeleteDialogComponent, {
        height: '450px',
        width: '500px',
        data:suppReserv,
      });
      dialogRef.afterClosed().subscribe(result=>{
        this.updateDataSource();
      });
    }
    else{ let dialogRef = this.dialog.open(TerrainConnectDialogComponent, {
      height: '200px',
      width: '400px',
      data:ter_id,
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.updateDataSource();
    })}
  }



}
