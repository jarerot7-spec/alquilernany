package com.alquismart.presentation.dto;

import com.alquismart.application.command.CrearSolicitudCommand;
import com.alquismart.domain.model.Solicitud;

import java.time.LocalDateTime;

public record SolicitudDto(
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
    public CrearSolicitudCommand toCommand() {
        return new CrearSolicitudCommand(id, clientRequestId, ofertaId, propietarioId, propietarioCorreo,
                solicitanteId, solicitanteNombre, solicitanteCorreo, solicitanteTelefono, tituloOferta,
                precioPublicado, precioPropuesto, garantiaPropuesta, fechaIngreso, mensaje, estado, fechaSolicitud);
    }

    public static SolicitudDto from(Solicitud solicitud) {
        return new SolicitudDto(solicitud.getId(), solicitud.getClientRequestId(), solicitud.getOfertaId(),
                solicitud.getPropietarioId(), solicitud.getPropietarioCorreo(), solicitud.getSolicitanteId(),
                solicitud.getSolicitanteNombre(), solicitud.getSolicitanteCorreo(), solicitud.getSolicitanteTelefono(),
                solicitud.getTituloOferta(), solicitud.getPrecioPublicado(), solicitud.getPrecioPropuesto(),
                solicitud.getGarantiaPropuesta(), solicitud.getFechaIngreso(), solicitud.getMensaje(),
                solicitud.getEstado(), solicitud.getFechaSolicitud());
    }
}
