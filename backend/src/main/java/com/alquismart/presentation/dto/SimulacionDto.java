package com.alquismart.presentation.dto;

import com.alquismart.application.command.GuardarSimulacionCommand;
import com.alquismart.domain.model.Simulacion;

import java.time.LocalDateTime;

public record SimulacionDto(
        Long id,
        String solicitudId,
        String propietarioId,
        String inquilinoId,
        String tituloOferta,
        Double montoGarantia,
        Integer diasGracia,
        Double recargoDiario,
        Double limiteReparacion,
        Integer diasAviso,
        Double penalidadSalida,
        Integer plazoRespuesta,
        String viaResolucion,
        String estado,
        String motivoRechazo,
        LocalDateTime fechaDefinida,
        LocalDateTime fechaRespuesta
) {
    public GuardarSimulacionCommand toCommand() {
        return new GuardarSimulacionCommand(id, solicitudId, propietarioId, inquilinoId, tituloOferta,
                montoGarantia, diasGracia, recargoDiario, limiteReparacion, diasAviso, penalidadSalida,
                plazoRespuesta, viaResolucion, estado, motivoRechazo, fechaDefinida, fechaRespuesta);
    }

    public static SimulacionDto from(Simulacion simulacion) {
        return new SimulacionDto(simulacion.getId(), simulacion.getSolicitudId(), simulacion.getPropietarioId(),
                simulacion.getInquilinoId(), simulacion.getTituloOferta(), simulacion.getMontoGarantia(),
                simulacion.getDiasGracia(), simulacion.getRecargoDiario(), simulacion.getLimiteReparacion(),
                simulacion.getDiasAviso(), simulacion.getPenalidadSalida(), simulacion.getPlazoRespuesta(),
                simulacion.getViaResolucion(), simulacion.getEstado(), simulacion.getMotivoRechazo(),
                simulacion.getFechaDefinida(), simulacion.getFechaRespuesta());
    }
}
