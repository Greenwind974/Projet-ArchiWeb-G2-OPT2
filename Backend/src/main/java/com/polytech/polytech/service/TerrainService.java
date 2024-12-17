package com.polytech.polytech.service;

import com.polytech.polytech.entity.Terrain;
import com.polytech.polytech.entity.Utilisateur;
import com.polytech.polytech.exception.NoTerrainInListException;
import com.polytech.polytech.exception.NoUserInListException;
import com.polytech.polytech.exception.TerrainNotFoundException;
import com.polytech.polytech.repository.TerrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TerrainService {

    /**
     * Instance de {@link TerrainRepository} pour faire appel à ses méthodes
     */
    @Autowired
    private TerrainRepository terrainRepository;

    public TerrainService(TerrainRepository terrainRepository) {
        this.terrainRepository = terrainRepository;
    }

    /**
     * Récupère tout les terrains de la BDD
     *
     * @return Liste contenant des objets {@link Terrain}
     */
    public List<Terrain> getAllTerrains() {
        if (terrainRepository.findAll().isEmpty()) {
            throw new NoTerrainInListException();
        }
        else {return terrainRepository.findAll();}
    }

    /**
     * Récupère le terrain dans la database dont l'id correspond à celui que l'on met en entré
     *
     * @param id Id du terrain que l'on souhaite avoir
     * @return Objet {@link Terrain}
     */
    public Terrain getTerrainById(Integer id) {
        return terrainRepository.findById(id).orElseThrow(TerrainNotFoundException::new);
    }

    /**
     * Créer dans la base de donnée un nouveau terrain
     *
     * @param terrain Objet {@link Terrain} que l'on souhaite créer
     * @return
     */
    public Terrain createTerrain(Terrain terrain) {
        return terrainRepository.save(terrain);
    }

    /**
     * Supprimme dans la BDD le terraain sélectionné par l'id
     *
     * @param id Id du terrain que l'on veut supprimmer
     */
    public void deleteTerrain(Integer id) {
        if (!terrainRepository.existsById(id)) {
            throw new TerrainNotFoundException();
        }
        else {
        terrainRepository.deleteById(id);}
    }

    /**
     * Met à jour les information d'un terrain dans la BDD
     *
     * @param id Id du terrain que l'on souhaite mettre à jour
     * @param updatedTerrain Objet {@link Terrain} contenant les informations à mettre à jour
     * @return Objet {@link Terrain}
     */
    public Terrain updateTerrain(Integer id, Terrain updatedTerrain) {
        if(terrainRepository.existsById(id)) {
            Terrain existingTerrain = getTerrainById(id);
            existingTerrain.setNom(updatedTerrain.getNom());
            existingTerrain.setDescription(updatedTerrain.getDescription());
            existingTerrain.setQuantite(updatedTerrain.getQuantite());
            existingTerrain.setPoint_geo(updatedTerrain.getPoint_geo());
            return terrainRepository.save(existingTerrain);
        }
        else {throw new TerrainNotFoundException();}
    }

    //Other methods

    /**
     * Récupère un terrain par rapport à une chaine de caractère correspondant au patterne que l'on cherche
     *
     * @param name Chaine de caractère que l'on souhaite analyser pour trouver les nom de terrain associé
     * @return Liste de terrain contenant des objets {@link Terrain}
     */
    public List<Terrain> getTerrainByName(String name) {
        if(terrainRepository.findAll().isEmpty()) {
            throw (new NoUserInListException());
        }
        else return terrainRepository.findByName(name).orElse(null);
    }

    



}
