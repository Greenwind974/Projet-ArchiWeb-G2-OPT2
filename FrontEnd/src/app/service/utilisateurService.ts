import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Utilisateur } from '../modele/utilisateur';
import { Reservation } from '../modele/reservation';
import { userAccount } from '../modele/userAccount';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  API_URL : string = "api"
  API_ENTITY : string = "utilisateur"
  API_ACTION! : string;


  constructor(private readonly http: HttpClient) {
  }

  /**
   * Permet d'envoyer les informations pour la création d'un utilisateur dans le back
   *
   * @param userInfo
   * @returns
   */
    create(userInfo : Utilisateur) : Observable<Utilisateur> {
      this.API_ACTION="create"
      return this.http.post<Utilisateur>(`${this.API_URL}/${this.API_ENTITY}/${this.API_ACTION}`, userInfo)
    }


    /**
     * Permet d'obtenir tout les utilisateur depuis le backend
     *
     * @returns
     */
    getall() : Observable<Utilisateur> {
      return this.http.get<Utilisateur>(`${this.API_URL}/${this.API_ENTITY}`)
    }

    /**
     * Envoie les informations concernant une reservation pour traitement
     *
     * @param value
     * @returns
     */
    reserver(value : Reservation) : Observable<Reservation> {
      this.API_ACTION = "reservation"

      return this.http.post<Reservation>(`${this.API_URL}/${this.API_ENTITY}/${this.API_ACTION}`, value,
        {
          params: new HttpParams()
            .set('terrain_id', value.terrain_id)
            .set('utilisateur_id', value.utilisateur_id)
        })
    }

    getAllReservation() : Observable<Reservation[]> {
      this.API_ACTION= "reservation"
      return this.http.get<Reservation[]>(`${this.API_URL}/${this.API_ENTITY}/${this.API_ACTION}`)
    }

    getReservationByUserId(id : number) : Observable<Reservation[]> {
      this.API_ACTION="reservationU"
      return this.http.get<Reservation[]>(`${this.API_URL}/${this.API_ENTITY}/${this.API_ACTION}/${id}`)
    }

    /**
     *
     * @param value
     * @returns
     */
    supprimerReservation(value : Reservation) : Observable<Reservation> {
      this.API_ACTION="reservation";
      return this.http.delete<Reservation>(`${this.API_URL}/${this.API_ENTITY}/${this.API_ACTION}`,
        { params: new HttpParams()
          .set('terrain_id', value.terrain_id)
          .set('utilisateur_id', value.utilisateur_id)
        })
    }

    /**
     * Envoie des informations de connexions (username et password) de l'utilisateur
     *
     * @param account Qui est l'interface contenant les informations utilisateur
     * @returns Identifiant de l'utilisateur
     */
    connection(account : userAccount) : Observable<number> {
      this.API_ACTION="connection"
      return this.http.post<number>(`${this.API_URL}/${this.API_ENTITY}/${this.API_ACTION}`, account)
    }


     /**
     * Deconnecte un utilisateur en enlevant l'userId dans SessionStorage
     */
    deconnection() : void {
      sessionStorage.removeItem("userId")
    }


    setSessionId(id : number) : void {
      sessionStorage.setItem("userId", id.toString() )
    }

    getUserWithId(id : number) : Observable<Utilisateur> {
      this.API_ACTION="userID"
      return this.http.get<Utilisateur>(`${this.API_URL}/${this.API_ENTITY}/${this.API_ACTION}/${id}`)
    }
}
