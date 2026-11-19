package com.alquismart.domain.model;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Simulacion {

    private Long id;

    private String solicitudId;

    private String propietarioId;

    private String inquilinoId;

    private String tituloOferta;

    /* =========================================
       CONDICIONES DEFINIDAS POR EL PROPIETARIO
       (se comparten con el inquilino para simular)
    ========================================= */
    private Double montoGarantia;

    private Integer diasGracia;

    private Double recargoDiario;

    private Double limiteReparacion;

    private Integer diasAviso;

    private Double penalidadSalida;

    private Integer plazoRespuesta;

    private String viaResolucion;

    /* =========================================
       ESTADO DE LA RESPUESTA DEL INQUILINO
       PENDIENTE / ACEPTADA / RECHAZADA
    ========================================= */
    private String estado;

    private String motivoRechazo;

    private LocalDateTime fechaDefinida;

    private LocalDateTime fechaRespuesta;

    public void redefinirCondiciones(Simulacion condiciones, LocalDateTime fecha) {
        propietarioId = condiciones.propietarioId;
        inquilinoId = condiciones.inquilinoId;
        tituloOferta = condiciones.tituloOferta;
        montoGarantia = condiciones.montoGarantia;
        diasGracia = condiciones.diasGracia;
        recargoDiario = condiciones.recargoDiario;
        limiteReparacion = condiciones.limiteReparacion;
        diasAviso = condiciones.diasAviso;
        penalidadSalida = condiciones.penalidadSalida;
        plazoRespuesta = condiciones.plazoRespuesta;
        viaResolucion = condiciones.viaResolucion;
        estado = "PENDIENTE";
        motivoRechazo = null;
        fechaRespuesta = null;
        fechaDefinida = fecha;
    }

    public void iniciarEn(LocalDateTime fecha) {
        validarSolicitudId();
        if (estado == null || estado.isBlank()) {
            estado = "PENDIENTE";
        }
        fechaDefinida = fecha;
    }

    public void validarSolicitudId() {
        if (solicitudId == null || solicitudId.isBlank()) {
            throw new IllegalArgumentException("solicitudId es obligatorio");
        }
    }

    public boolean responder(String nuevoEstado, String motivo, LocalDateTime fecha) {
        if (!"ACEPTADA".equals(nuevoEstado) && !"RECHAZADA".equals(nuevoEstado)) {
            return false;
        }
        estado = nuevoEstado;
        motivoRechazo = motivo;
        fechaRespuesta = fecha;
        return true;
    }
}
