import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UtilisateurService} from '../../service/utilisateurService';
import {catchError, map, of} from 'rxjs';
import {UserLoginComponent} from '../../components/user-login/user-login.component';
import {MatDialog} from '@angular/material/dialog';
import {DeconnectDialogComponent} from '../../components/dialog/deconnect-dialog/deconnect-dialog.component';
import {NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  userId!: number;
  username!: string;

  constructor(private userServ: UtilisateurService, private dialog:MatDialog) {
  }

  ngOnInit() {
    this.getUserName();
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

  deconnect() {
    let dialogRef = this.dialog.open(DeconnectDialogComponent, {
      height: '200px',
      width: '400px',
      data:this.userId,
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.update();
    })
  }

  update(){
    window.location.reload();
  }

  getUserName() : string {
    //Récupération de l'id dans sessionStorage
    const id = sessionStorage.getItem("userId")
    //Action si id existant
    if(id != null) {
      this.userServ.getUserWithId(parseInt(id)).subscribe(value =>{this.username = value.username;
      })
    }
    return this.username
  }

  isConnected() : boolean {
    const id = sessionStorage.getItem("userId")
    if (id != null) {
      return true;
    }
    return false;
  }

  deconnectUser() {
    this.userServ.deconnection()
  }

  protected readonly UserLoginComponent = UserLoginComponent;
  protected readonly UtilisateurService = UtilisateurService;
}
