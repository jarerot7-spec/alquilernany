package com.alquismart.presentation.dto;

import com.alquismart.infrastructure.persistence.entity.ContratoJpaEntity;
import java.time.LocalDateTime;

public record ContratoDto(
        Long id,
        String solicitudId,
        String propietarioId,
        String inquilinoId,
        String tituloOferta,
        Double rentaMensual,
        String estado,
        LocalDateTime fechaAceptacion,
        String contenido
) {
    public static ContratoDto from(ContratoJpaEntity entity) {
        return new ContratoDto(
                entity.getId(),
                entity.getSolicitudId(),
                entity.getPropietarioId(),
                entity.getInquilinoId(),
                entity.getTituloOferta(),
                entity.getRentaMensual(),
                entity.getEstado(),
                entity.getFechaAceptacion(),
                entity.getContenido()
        );
    }
}
