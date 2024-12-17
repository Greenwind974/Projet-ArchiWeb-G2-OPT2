package com.polytech.polytech.mapper;

import com.polytech.polytech.entity.Terrain;
import com.polytech.polytech.DTO.TerrainDTO;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TerrainMapper {

    /**
     * Transforme les DTO en entité
     *
     * @param terrain Terrain que l'on veut transformer
     * @return Entité {@link Terrain}
     */
    Terrain toEntity(TerrainDTO terrain);


    /**
     * Transforme les Entité en DTO
     *
     * @param terrain Terrain que l'on souhaite transformer
     * @return DTO {@link TerrainDTO}
     */
    TerrainDTO toDTO(Terrain terrain);
}
