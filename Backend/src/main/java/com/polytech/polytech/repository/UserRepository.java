package com.polytech.polytech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.polytech.polytech.entity.Utilisateur;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<Utilisateur, Integer> {
    @Query("SELECT u FROM Utilisateur u WHERE lower(u.username) = lower(:name)")
    Optional<Utilisateur> findByName(@Param("name") String name);
}
