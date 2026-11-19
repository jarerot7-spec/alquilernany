package com.alquismart.domain.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

class SimulacionTest {
    @Test
    void redefinirCondicionesReiniciaLaNegociacion() {
        LocalDateTime fecha = LocalDateTime.of(2026, 11, 12, 12, 0);
        Simulacion simulacion = Simulacion.builder()
                .estado("RECHAZADA")
                .motivoRechazo("No acepto")
                .fechaRespuesta(fecha.minusDays(1))
                .build();
        Simulacion nuevasCondiciones = Simulacion.builder()
                .propietarioId("propietario-1")
                .montoGarantia(500.0)
                .build();

        simulacion.redefinirCondiciones(nuevasCondiciones, fecha);

        assertEquals("PENDIENTE", simulacion.getEstado());
        assertEquals("propietario-1", simulacion.getPropietarioId());
        assertEquals(500.0, simulacion.getMontoGarantia());
        assertEquals(fecha, simulacion.getFechaDefinida());
        assertNull(simulacion.getMotivoRechazo());
        assertNull(simulacion.getFechaRespuesta());
    }

    @Test
    void responderSoloAceptaEstadosPermitidos() {
        Simulacion simulacion = Simulacion.builder().estado("PENDIENTE").build();
        LocalDateTime fecha = LocalDateTime.of(2026, 11, 12, 12, 0);

        assertFalse(simulacion.responder("EN_REVISION", null, fecha));
        assertEquals("PENDIENTE", simulacion.getEstado());
        assertNull(simulacion.getFechaRespuesta());
    }

    @Test
    void iniciarRequiereUnaSolicitud() {
        Simulacion simulacion = new Simulacion();

        assertThrows(IllegalArgumentException.class,
                () -> simulacion.iniciarEn(LocalDateTime.now()));
    }
}
