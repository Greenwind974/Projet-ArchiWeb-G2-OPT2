import {Component, inject, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilisateurService } from '../../service/utilisateurService';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulaire-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './formulaire-user.component.html',
  styleUrl: './formulaire-user.component.css'
})
export class FormulaireUserComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);

  userForm! : FormGroup;

  constructor(
    private formB: FormBuilder,
    private userService : UtilisateurService,
    private router: Router) {}

    ngOnInit() {
      this.userForm = this.formB.group({
        nom: [''],
        prenom: [''],
        mail: [''],
        password: [''],
        username: ['']
      });
    }

  CreateUser() : void{
    this.userService.create(this.userForm.value).subscribe({next:(user)=> console.log("user created", this.userForm.value)});
    this.router.navigateByUrl(`user-login`);
    this._snackBar.open("Utilisateur créé","Ok",{duration: 3000});
  }

}
