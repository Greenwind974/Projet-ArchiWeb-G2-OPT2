import {Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UtilisateurService } from '../../service/utilisateurService';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { userAccount } from '../../modele/userAccount';
import { Security } from '../../service/security';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit{
  private _snackBar = inject(MatSnackBar);

  loginGrp! : FormGroup;
  userID! : number;

  constructor(
    private formB : FormBuilder,
    private userServ : UtilisateurService,
    private secu : Security,
  ) {}

  ngOnInit(): void {
    this.userID = 0;
    this.loginGrp = this.formB.group( {
      username: [''],
      password: ['']
    });
  }
  /**
   *
   */
  Connection() : void {

    let newConnection : userAccount = this.loginGrp.value;
    if(this.secu.AnalyseWord(newConnection.username) != true && this.secu.AnalyseWord(newConnection.password) != true){
      this.userServ.connection(this.loginGrp.value).subscribe( {next:(userId : number)=>{
          if(userId > 0) {
            this.userServ.setSessionId(userId);
            window.location.href=`tableau-reservations`;
            this._snackBar.open("Utilisateur connecté","Ok",{duration: 3000});
          } else console.log("Identifiant incorrect")
        }
      });
    }
  }

}
