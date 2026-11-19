package com.alquismart.application.command;

import com.alquismart.domain.model.Solicitud;

import java.time.LocalDateTime;

public record CrearSolicitudCommand(
        Long id,
        String clientRequestId,
        String ofertaId,
        String propietarioId,
        String propietarioCorreo,
        String solicitanteId,
        String solicitanteNombre,
        String solicitanteCorreo,
        String solicitanteTelefono,
        String tituloOferta,
        Double precioPublicado,
        Double precioPropuesto,
        Double garantiaPropuesta,
        String fechaIngreso,
        String mensaje,
        String estado,
        LocalDateTime fechaSolicitud
) {
    public Solicitud toDomain() {
        return Solicitud.builder()
                .id(id).clientRequestId(clientRequestId).ofertaId(ofertaId)
                .propietarioId(propietarioId).propietarioCorreo(propietarioCorreo)
                .solicitanteId(solicitanteId).solicitanteNombre(solicitanteNombre)
                .solicitanteCorreo(solicitanteCorreo).solicitanteTelefono(solicitanteTelefono)
                .tituloOferta(tituloOferta).precioPublicado(precioPublicado)
                .precioPropuesto(precioPropuesto).garantiaPropuesta(garantiaPropuesta)
                .fechaIngreso(fechaIngreso).mensaje(mensaje).estado(estado)
                .fechaSolicitud(fechaSolicitud)
                .build();
    }
}
