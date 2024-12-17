package com.polytech.polytech.service;
import com.polytech.polytech.entity.Terrain;
import com.polytech.polytech.entity.Utilisateur;
import com.polytech.polytech.exception.NoUserInListException;
import com.polytech.polytech.exception.UserNotFoundException;
import com.polytech.polytech.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtilisateurService {
    /**
     * Instance de {@link UserRepository} pour appeler ses méthodes dans le service
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * Service renvoyant une liste d'utilisateur.
     *
     * Ce service utilise l'instance de repository pour récupérer tout les utilisateurs de la BDD et les envoyer dans le controller
     *
     * @return Liste d'utilisateur issue de la base de données
     */
    public List<Utilisateur> getAllUsers() {
        if(userRepository.findAll().isEmpty()) {
            throw (new NoUserInListException());
        } else {
            return userRepository.findAll();
        }
    }

    /**
     *
     * @param user Entité utilisateur dont les informations sont envoyé dans le repository pour insertion
     * @return
     */
    public Utilisateur createUser(Utilisateur user) {
        return userRepository.save(user);
    }

    /**
     * Revoie un objet utilisateur basé sur l'id en paramètre
     *
     * @param id Id de l'utilisateur que l'on souhaite récupérer dans le repository
     * @return
     */
    public Utilisateur getUserById(Integer id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    /**
     * Revoie un objet utilisateur basé sur l'username en paramètre
     *
     * @param name
     * @return
     */
    public Utilisateur getUserByName(String name) {
        if(userRepository.findAll().isEmpty()) {
            throw (new NoUserInListException());
        }
        else return userRepository.findByName(name).orElse(null);
        }


    /**
     * Supprimme un utilisateur en se basant sur l'id en paramètre
     *
     * @param id
     */
    public void deleteUser(Integer id) {
        if(userRepository.findById(id).isPresent()) {
            userRepository.deleteById(id);
        } else {
            throw (new UserNotFoundException());
        }
    }

    /**
     * Met à jour les informations d'un utilisateurs en se basant sur l'id
     *
     * @param id ID de l'utilisateur que l'on va modifier
     * @param updatedUser Informations à extraire pour modification
     * @return
     */
    public Utilisateur updateUser(Integer id, Utilisateur updatedUser) {
        if(userRepository.findById(id).isPresent()) {
            Utilisateur existingUser = getUserById(id);
            existingUser.setNom(updatedUser.getNom());
            existingUser.setPrenom(updatedUser.getPrenom());
            existingUser.setMail(updatedUser.getMail());
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setPassword(updatedUser.getPassword());
            return userRepository.save(existingUser);
        } else {
            throw (new UserNotFoundException());
        }
    }

    
}
