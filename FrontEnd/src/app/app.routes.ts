import { Routes } from '@angular/router';
import {TableauComponent} from './components/tableau/tableau.component';
import {TerrainDeleteDialogComponent} from './components/dialog/terrain-delete-dialog/terrain-delete-dialog.component';
import {TerrainUpdateDialogComponent} from './components/dialog/terrain-update-dialog/terrain-update-dialog.component';
import {FormulaireUserComponent} from './components/formulaire-user/formulaire-user.component';
import {ReservTableauComponent} from './components/reserv-tableau/reserv-tableau.component';
import {TerrainComponent} from './components/terrain/terrain.component';
import {UserLoginComponent} from './components/user-login/user-login.component';
import {MapComponent} from './components/map/map.component';
import {DeconnectDialogComponent} from './components/dialog/deconnect-dialog/deconnect-dialog.component';

export const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  {
    path: 'terrain-delete-dialog',
    component: TerrainDeleteDialogComponent
  },
  {
    path: 'terrain-update-dialog',
    component: TerrainUpdateDialogComponent
  },
  {
    path: 'formulaire-user',
    component: FormulaireUserComponent
  },
  {
    path: 'tableau-reservations',
    component: ReservTableauComponent
  },
  {
    path: 'tableau',
    component: TableauComponent
  },
  {
    path: 'terrain',
    component: TerrainComponent
  },
  {
    path: 'user-login',
    component: UserLoginComponent
  },
  {
    path: 'deconnection',
    component: DeconnectDialogComponent
  }
];
