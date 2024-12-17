import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import {terrainService} from '../../service/terrainService';
import {Terrain} from '../../modele/terrain';

/**
 * @author:Antoine Saintagne
 * Composant Map, permettant de gérer la carte des terrains
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  /**
   * Cet attribut contient toutes les informations nécéssaires à l'affichage de notre carte
   */
  private map : any;

  /**
   * Initialise et affiche la carte du monde, centrée sur la ville de Tours
   *
   * @return
   */
  private initMap(): void {
    /**
     * On commence par initialiser un objet carte complétement vide, il s'agit plus d'une sorte de carré sur lequel on vient dessiner
     * On centre la vue sur la partie du carré qui va contenir la ville de Tours
     */
    this.map = L.map('map', {
      center: [ 47.40, 0.65 ],
      zoom: 11.5
    });


    /**
     * On récupère la couche qui va représenter notre carte sur OpenStreetMap
     */
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });


    /**
     * On superpose la couche sur notre carte
     */
    tiles.addTo(this.map);



  }

  constructor(private readonly servTerrain:terrainService) { }


  /**
   * @author:Antoine Saintagne
   * Récupère tous les terrains de pétanques stockés dans la base de donnée, et place les marqueurs correspondants sur la carte
   *
   * @return
   */
  private addMarkers():void{

    /**
     * Cette variable permet de définir l'apparence de l'icone qui marquera tous les terrains de la carte
     * Les deux anchors permettent d'aligner l'icone et le popup qui y est lié, pour un affichage plus lisible
     * L'image de l'icone est prise à partir d'internet, iconUrl correspond à l'url de l'icone, et attribution permet de respecter les droits d'auteurs de l'image
     */
    var icone = L.icon({
      iconUrl: 'https://img.icons8.com/?size=80&id=114512&format=png',
      iconAnchor:   [40, 94],
      popupAnchor:  [-3, -76],
      attribution: '&copy; <a target="_blank" href="https://icons8.com/icon/114512/bocce">Bocce</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>'
    });

    /**
     * On récupère les terrains de la BDD à l'aide du terrainService qui permet la communication avec le Backend, et on définit le comportement que le Frontend doit adopter
     */
    this.servTerrain.getAllTerrain().subscribe((terrainsListe:Terrain[]) => {
      /**
       * On a récupéré une liste de terrains, pour chacun d'entre eux :
       */
      for (const terrain of terrainsListe) {
        /**
         * On traduit les coordonnées reçues (sous forme de string) en coordonnées interprétables par leaflet.
         * D'abord on extrait la latitude et la longitude du terrain
         */
        const coordsSeparees = terrain.point_geo.split(", ")
        /**
         * Puis on utilise ces coordonnées pour créer un objet L.LatLng, permettant d'assigner la localisation au marqueur correspondant.
         */
        const coords: L.LatLng = L.latLng(Number(coordsSeparees[0]), Number(coordsSeparees[1]))
        /**
         * On créé le marqueur avec ses coordonnées, l'icone que nous avons défini, et un popup contenant le nom et la description du terrain
         */
        const marqueur = L.marker(coords, {icon : icone}).bindPopup('<b>' + terrain.nom + '</b><br>Description : ' + terrain.description);
        /**
         * On ajoute le marqueur sur la carte
         */
        marqueur.addTo(this.map)
      }
    });
  }

  /**
   * Définit le comportement d'Angular après l'initialisation du composant
   * Il crée la carte, puis ajoute les marqueurs
   */
  ngAfterViewInit(): void {
    this.initMap();
    this.addMarkers()
  }
}
