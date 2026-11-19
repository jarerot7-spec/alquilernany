package com.alquismart.application.command;

import com.alquismart.domain.model.Oferta;

import java.time.LocalDateTime;

public record CrearOfertaCommand(
        Long id,
        String propietarioId,
        String propietarioCorreo,
        String tipo,
        String titulo,
        String ubicacion,
        String direccion,
        String descripcion,
        Double precio,
        Double garantia,
        Double mantenimiento,
        Integer dormitorios,
        Integer banos,
        Double area,
        String telefono,
        String foto,
        LocalDateTime fechaPublicacion
) {
    public Oferta toDomain() {
        return Oferta.builder()
                .id(id).propietarioId(propietarioId).propietarioCorreo(propietarioCorreo)
                .tipo(tipo).titulo(titulo).ubicacion(ubicacion).direccion(direccion)
                .descripcion(descripcion).precio(precio).garantia(garantia).mantenimiento(mantenimiento)
                .dormitorios(dormitorios).banos(banos).area(area).telefono(telefono)
                .foto(foto).fechaPublicacion(fechaPublicacion)
                .build();
    }
}
