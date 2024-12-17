import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Terrain } from '../modele/terrain';

@Injectable({
  providedIn: 'root'
})

export class terrainService {

  API_URL: string = "api";
  API_ENTITY_NAME: string = "terrain";

  constructor(private readonly http: HttpClient) {
  }

  createTerrain(terrain: Terrain): Observable<Terrain> {
    return this.http.post<Terrain>(`${this.API_URL}/${this.API_ENTITY_NAME}`, terrain);
  }

  getAllTerrain(): Observable<Terrain[]> {
    return this.http.get<Terrain[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }

  getTerrainById(id :number): Observable<Terrain> {
    return this.http.get<Terrain>(`${this.API_URL}/${this.API_ENTITY_NAME}/` + id);
  }

  updateTerrain(id: number, terrain: Terrain): Observable<Terrain>{
    return this.http.put<Terrain>(`${this.API_URL}/${this.API_ENTITY_NAME}/` + id, terrain);
  }

  deleteTerrain(id: number): Observable<Terrain> {
    return this.http.delete<Terrain>(`${this.API_URL}/${this.API_ENTITY_NAME}/` + id)
  }
}
