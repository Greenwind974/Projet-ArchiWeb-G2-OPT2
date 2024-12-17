package com.polytech.polytech.mapper;

import com.polytech.polytech.DTO.TerrainDTO;
import com.polytech.polytech.entity.Terrain;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor"
)
@Component
public class TerrainMapperImpl implements TerrainMapper {

    @Override
    public Terrain toEntity(TerrainDTO terrain) {
        if ( terrain == null ) {
            return null;
        }

        Terrain.TerrainBuilder terrain1 = Terrain.builder();

        terrain1.id( terrain.getId() );
        terrain1.nom( terrain.getNom() );
        terrain1.quantite( terrain.getQuantite() );
        terrain1.description( terrain.getDescription() );
        terrain1.point_geo( terrain.getPoint_geo() );

        return terrain1.build();
    }

    @Override
    public TerrainDTO toDTO(Terrain terrain) {
        if ( terrain == null ) {
            return null;
        }

        TerrainDTO.TerrainDTOBuilder terrainDTO = TerrainDTO.builder();

        terrainDTO.id( terrain.getId() );
        terrainDTO.nom( terrain.getNom() );
        terrainDTO.quantite( terrain.getQuantite() );
        terrainDTO.description( terrain.getDescription() );
        terrainDTO.point_geo( terrain.getPoint_geo() );

        return terrainDTO.build();
    }
}
