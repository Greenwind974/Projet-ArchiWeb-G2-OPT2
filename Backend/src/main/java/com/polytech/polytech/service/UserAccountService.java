package com.polytech.polytech.service;

import com.polytech.polytech.entity.UserAccount;
import com.polytech.polytech.entity.Utilisateur;
import com.polytech.polytech.exception.NoAccountFoundException;
import com.polytech.polytech.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserAccountService {

    /**
     * Instance de {@link UserRepository} pour faire appel à ces méthodes
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * Permet de vérifier les informations de connection d'un utilisateur
     *
     * @param userAccount Informations que l'on souhaite vérifier
     * @return
     */
    public Integer checkUser(UserAccount userAccount) {
        //Récupère l'utilisateur à vérifier à partir du repository de l'utilisateur
        Utilisateur userToCheck = this.userRepository.findByName(userAccount.getUsername()).orElseThrow(NoAccountFoundException::new);
        //Vérification du mot de passe
        if (userToCheck == null || (!userToCheck.getPassword().equals(userAccount.getPassword()))) {
            return null;

        }
        return userToCheck.getId();
    }

}
