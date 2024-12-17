package com.polytech.polytech.controller;


import com.polytech.polytech.DTO.TerrainDTO;
import com.polytech.polytech.DTO.UtilisateurDTO;
import com.polytech.polytech.entity.Terrain;
import com.polytech.polytech.entity.Utilisateur;
import com.polytech.polytech.mapper.TerrainMapper;
import com.polytech.polytech.service.TerrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/terrain")
public class TerrainController {

    @Autowired
    private TerrainService terrainService;

    @Autowired
    private TerrainMapper terrainMapper;

    /**
     * Constructeur de la classe TerrainService
     *
     * @param terrainService Instance de la classe {@link TerrainService}
     * @param terrainMapper Instance de la classe {@link TerrainMapper}
     */
    public TerrainController(TerrainService terrainService, TerrainMapper terrainMapper) {
        this.terrainService = terrainService;
        this.terrainMapper = terrainMapper;
    }

    /**
     * Récupère tout les terrains de la BDD
     *
     * @return Liste d'objet {@link TerrainDTO}
     */
    @GetMapping
    public List<TerrainDTO> getAllTerrains() {
        List<Terrain> listOfTerrain = this.terrainService.getAllTerrains();
        List<TerrainDTO> listOfTerrainDTO = new ArrayList<>();
        for (Terrain t : listOfTerrain) {
            listOfTerrainDTO.add(this.terrainMapper.toDTO(t));
        }
        return listOfTerrainDTO;
    }

    /**
     * Créer un terrain dans la BDD
     *
     * @param terrainDTO Objet {@link TerrainDTO} que l'on souhaite mettre dans la BDD
     * @return Message de status
     */
    @PostMapping
    public ResponseEntity<String> createTerrain(@RequestBody TerrainDTO terrainDTO) {
        if(this.terrainService.createTerrain(this.terrainMapper.toEntity(terrainDTO)) != null ){
            return ResponseEntity.ok("Terrain created");
        }
        return ResponseEntity.badRequest().body("Error in the creation of a terrain");
    }

    /**
     * Récupère un terrain par son Id
     *
     * @param id Id du Terrain que l'on veut récuipérer
     * @return Objet {@link TerrainDTO}
     */
    @GetMapping("/{id}")
    public TerrainDTO getTerrainById(@PathVariable Integer id) {
        return this.terrainMapper.toDTO(this.terrainService.getTerrainById(id));
    }

    /**
     * Récupère un terrain par rapport à son nom
     *
     * @param nom Nom du terrain associé
     * @return Liste contenant des objet {@link TerrainDTO}
     */
    @GetMapping("/getByName/{nom}")
    public List<TerrainDTO> getTerrainByName(@PathVariable String nom) {
        List<Terrain> listOfTerrain = this.terrainService.getTerrainByName(nom);
        List<TerrainDTO> listOfTerrainDTO = new ArrayList<>();
        for (Terrain t : listOfTerrain) {
            listOfTerrainDTO.add(this.terrainMapper.toDTO(t));
        }
        return listOfTerrainDTO;
    }

    /**
     * Supprimme un terrain dans la base données
     *
     * @param id Id du terrain que l'on veut supprimmer
     */
    @DeleteMapping("/{id}")
    public void deleteTerrain(@PathVariable Integer id) {
        this.terrainService.deleteTerrain(id);
    }

    /**
     * Met à jour les informations d'un terrain
     *
     * @param id Id du terrain à modifier
     * @param updatedTerrainDTO Objet {@link TerrainDTO} contenant les informations à modifier
     * @return Réponse dans l'URL
     */
    @PutMapping("/{id}")
    public ResponseEntity<TerrainDTO> updateTerrain(@PathVariable Integer id, @RequestBody TerrainDTO updatedTerrainDTO) {
        return ResponseEntity.ok(this.terrainMapper.toDTO(
                terrainService.updateTerrain(id, this.terrainMapper.toEntity(updatedTerrainDTO))));
    }

}


