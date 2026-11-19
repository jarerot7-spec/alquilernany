package com.alquismart.application.command;

import com.alquismart.domain.model.Simulacion;

import java.time.LocalDateTime;

public record GuardarSimulacionCommand(
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
    public Simulacion toDomain() {
        return Simulacion.builder()
                .id(id).solicitudId(solicitudId).propietarioId(propietarioId)
                .inquilinoId(inquilinoId).tituloOferta(tituloOferta).montoGarantia(montoGarantia)
                .diasGracia(diasGracia).recargoDiario(recargoDiario).limiteReparacion(limiteReparacion)
                .diasAviso(diasAviso).penalidadSalida(penalidadSalida).plazoRespuesta(plazoRespuesta)
                .viaResolucion(viaResolucion).estado(estado).motivoRechazo(motivoRechazo)
                .fechaDefinida(fechaDefinida).fechaRespuesta(fechaRespuesta)
                .build();
    }
}
