package com.polytech.polytech.controller;


import com.polytech.polytech.DTO.ReservationDTO;
import com.polytech.polytech.DTO.UserAccountDTO;
import com.polytech.polytech.DTO.UtilisateurDTO;
import com.polytech.polytech.entity.Reservation;
import com.polytech.polytech.entity.Utilisateur;
import com.polytech.polytech.exception.NoAccountFoundException;
import com.polytech.polytech.mapper.ReservationMapper;
import com.polytech.polytech.mapper.UserAccountMapper;
import com.polytech.polytech.mapper.UtilisateurMapper;
import com.polytech.polytech.service.ReservationService;
import com.polytech.polytech.service.UserAccountService;
import com.polytech.polytech.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

//@Slf4j

@RestController
@RequestMapping("/api/utilisateur")
public class UserController {
    //Attributs

    @Autowired
    private UtilisateurService userService;

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private UserAccountService userAccountService;

    @Autowired
    private UtilisateurMapper userMapper;

    @Autowired
    private ReservationMapper reservationMapper;

    @Autowired
    private UserAccountMapper userAccountMapper;




    //Constructeur

    /**
     * Constructeur de la classe {@link UserController}
     * @param userServiceParam Instance de {@link UtilisateurService} permettant l'appel des services utilisateurs
     * @param userMapperParam Instance de {@link UtilisateurMapper} permettant la convertion des entité en DTO et vice-versa
     * @return
     */
    public UserController(UtilisateurService userServiceParam, UtilisateurMapper userMapperParam) {
        this.userService = userServiceParam;
        this.userMapper = userMapperParam;
    }

    //Partie CRUD

    /**
     * Crée un nouvel utilisateur à partir des données envoyées dans la requête.
     * Cette méthode reçoit un objet JSON contenant les informations sur un utilisateurs (nom, prenom, mail, password et username)
     * puis effectue une sauvegarde de ces information. Elle renvoie par la suite un message "Ok" si l'utilisateur a bien été créer
     * , une exception dans le cas contraire.
     *
     * @param userDTO L'objet {@link UtilisateurDTO} qui contient les informations à insérer dans la BDD..
     * @return Réponse envoyé via HTTP permettant d'indiquer qu'un utilisateur a bien été créer dans la BDD
     */
    @PostMapping(value="/create" ,produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<UtilisateurDTO> createUser(@RequestBody() UtilisateurDTO userDTO) {
        return ResponseEntity.ok(
                this.userMapper.toDTO(
                    this.userService.createUser(
                        this.userMapper.toEntity(userDTO))));
    }


    /**
     * Renvoie tout les utilisateurs présent dans la base de données.*
     * Tout les utilisateurs et leurs informations associé seront placé dans une liste d'objet en JSON.
     * Si aucun utilisateur n'est présent dans la base, une exception sera envoyé.
     *
     * On utilise ici la méthode GET pour renvoyer
     * @return Liste des utilisateurs de la base renvoyé en format JSON
     */
    @GetMapping
    public List<UtilisateurDTO> getAllUsers() {
        //Récupération de la liste pour la transformer en DTO
        List<Utilisateur> listOfUser = this.userService.getAllUsers();
        List<UtilisateurDTO> listOfUserDTO = new ArrayList<>();

        //Boucle pour transformation de chaque éléments
        for (Utilisateur u : listOfUser) {
            listOfUserDTO.add(this.userMapper.toDTO(u));
        }
        return listOfUserDTO;
    }

    /**
     * Renvoie les information
     *
     * Tout les utilisateurs et leurs informations associé seront placé dans une liste d'objet en JSON.
     * Si aucun utilisateur n'est présent dans la base, une exception sera envoyé.
     *
     *
     * On utilise ici la méthode GET pour renvoyer
     * @return Liste des utilisateurs de la base renvoyé en format JSON
     */
    @GetMapping("/userID/{id}")
    public UtilisateurDTO getUserById(@PathVariable Integer id) {
            return userMapper.toDTO(
                    this.userService.getUserById(id));
    }

    /**
     * Supprime un utilisateur en le sélectionnant par son ID dans la base de données
     *
     * @param id ID de l'utilisateur que l'on souhaite supprimmer
     */
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        this.userService.deleteUser(id);
    }

    /**
     * Modifie les informations d'un utilisateur, sélectionner par son ID, dans la BDD
     *
     * @param id ID de l'utilisateur a modifié
     * @param updatedUserDTO Objet contenant les informations à modifier concernant l'utilisateur
     * @return
     */
    @PutMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> updateUser(@PathVariable Integer id, @RequestBody UtilisateurDTO updatedUserDTO) {
        return ResponseEntity.ok(this.userMapper.toDTO(
                this.userService.updateUser(id,
                        this.userMapper.toEntity(updatedUserDTO))));
    }



    //Méthodes supplémentaire

    /**
     * Renvoie un objet utilisateur en fonction de son username
     *
     *
     * @param nom Username de la personne que l'on cherche
     * @return Information de l'utilisateur que l'on souhaite récupérer
     */
    @GetMapping("/username/{nom}")
    public ResponseEntity<UtilisateurDTO> getUserByNom(@PathVariable String nom) {
        return ResponseEntity.ok(
                userMapper.toDTO(
                        this.userService.getUserByName(nom)));
    }



    /**
     * Renvoie toutes les réservations qui ont été effectué présente dans la base de données
     *
     * @return Liste de toutes les reservations contenant l'id du terrain et de l'utilisateur qui l'a réservé
     */
    @GetMapping(value="/reservation")
    public ResponseEntity<List<ReservationDTO>> getAllReservations() {
        //Initialisation des liste pour le mapping
        List<ReservationDTO> listReservDTO = new ArrayList<>();
        List<Reservation> listReserv = this.reservationService.getAllReservation();
        //Boucle de convertion entité to DTO
        for (Reservation r : listReserv) {
            listReservDTO.add(this.reservationMapper.toDTO(r));
        }
        return ResponseEntity.ok(listReservDTO);
    }

    /**
     * Renvoie les réservation spécifique à l'id d'un utilisateur
     *
     * @param id ID de l'utilisateur
     * @return Liste contenant toutes les réservations dont l'id de l'utilisateur correspond avec le paramètre
     */
    @GetMapping(value="/reservationU/{id}")
    public ResponseEntity<List<ReservationDTO>> getUserReserv(@PathVariable Integer id) {
        //Initialisation des liste pour le mapping
        List<ReservationDTO> listReservDTO = new ArrayList<>();
        List<Reservation> listReserv = this.reservationService.getReservByUserId(id);
        //Boucle de convertion entité to DTO
        for (Reservation r : listReserv) {
            listReservDTO.add(this.reservationMapper.toDTO(r));
        }
        return ResponseEntity.ok(listReservDTO);
    }

    /**
     * Renvoie les réservation spécifique à l'id d'un terrain
     *
     * @param id ID du terrain associé à la requête
     * @return Liste des terrains associé à cette ID
     */
    @GetMapping(value="/reservationT/{id}")
    public ResponseEntity<List<ReservationDTO>> getTerrainReserv(@PathVariable Integer id) {
        //Initialisation des liste pour le mapping
        List<ReservationDTO> listReservDTO = new ArrayList<>();
        List<Reservation> listReserv = this.reservationService.getReservByTerrainId(id);
        //Boucle de convertion entité to DTO
        for (Reservation r : listReserv) {
            listReservDTO.add(this.reservationMapper.toDTO(r));
        }
        return ResponseEntity.ok(listReservDTO);
    }

    /**
     * Permet à un utilisateur de faire une reservation. Les données de cette reservation seront enregistré dans une BDD
     *
     * @param terrain_id Id du terrain à réserver
     * @param utilisateur_id Id de l'utilisateur effectuant la réservation
     * @return Réponse dans l'URL
     */
    @PostMapping(value = "/reservation")
    public ResponseEntity<ReservationDTO> createReservation(@RequestParam Integer terrain_id, @RequestParam Integer utilisateur_id) {
        return ResponseEntity.ok(
                this.reservationMapper.toDTO(
                    this.reservationService.reserverTerrain(utilisateur_id, terrain_id)
                ));
    }

    /**
     * Modification d'une réservation
     *
     * @param oldTerrainId Ancien Id du terrain
     * @param newTerrainId Nouvelle iD du terrain
     * @param utilisateur_id Utilisateur souhaitant faire la requête
     * @return
     */
    @PutMapping(value="/reservation")
    public ResponseEntity<ReservationDTO> updateReservation(@RequestParam Integer oldTerrainId ,@RequestParam Integer newTerrainId , @RequestParam Integer utilisateur_id) {
        return ResponseEntity.ok(
                this.reservationMapper.toDTO(
                        this.reservationService.updateReservation(oldTerrainId, newTerrainId, utilisateur_id)
                ));
    }


    /**
     * Supprime une réservation présente dans la BDD en utilisant l'id du terrain et de l'utilisateur
     *
     * @param utilisateur_id Id de l'utilisateur qui a réservé
     * @param terrain_id Id du terrain qui a été reservé
     */
    @DeleteMapping(value="/reservation")
    public ResponseEntity<String> deleteReservation(@RequestParam Integer utilisateur_id, @RequestParam Integer terrain_id) {
        //Condition de  vérification de code d'erreur
        if(this.reservationService.supprimerReserv(terrain_id, utilisateur_id) == 0) {
            return ResponseEntity.ok("Reservation supprimmer avec succès");
        }
        else return ResponseEntity.ok("Echec dans la suppression");
    }


    /**
     * Renvoie un ID de l'utilisateur pour confirmer la connexion à son compte
     *
     * La fonction reçoit un username et un mot de passe en entré et analyse ceux-ci pour voir si la connexion est possible.
     * On utiliser ici le mapper pour transformer les DTO en entité et les envoyer dans les service pour traitements.
     *
     * @param userAccount Objet contenant le username et le mot de passe utilisateur
     * @return Entier représentant l'Id de l'utilisateur associé
     */
    @PostMapping(value="/connection", produces = {MediaType.APPLICATION_JSON_VALUE},consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Integer> connectUser(@RequestBody UserAccountDTO userAccount) {
        //Vérification des informations
        Integer userID = this.userAccountService.checkUser(this.userAccountMapper.toEntity(userAccount));

        //Action à effectuer en fonction de l'état de userID
        if (userID != null) {
            return ResponseEntity.ok(userID);
        }
        else throw new NoAccountFoundException();

    }

}