package com.polytech.polytech.repository;

import com.polytech.polytech.entity.Terrain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TerrainRepository extends JpaRepository<Terrain, Integer> {

    @Query("SELECT t FROM Terrain t WHERE lower(t.nom) LIKE %:name%")
    public Optional<List<Terrain>> findByName(@Param("name") String name);

}
