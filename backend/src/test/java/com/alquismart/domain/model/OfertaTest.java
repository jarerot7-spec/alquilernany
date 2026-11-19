package com.alquismart.domain.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class OfertaTest {
    @Test
    void publicarCompletaLaFechaSinReemplazarUnaExistente() {
        LocalDateTime fechaOriginal = LocalDateTime.of(2026, 11, 10, 10, 0);
        Oferta oferta = Oferta.builder()
                .tipo("Apartamento")
                .titulo("Alquiler")
                .precio(800.0)
                .fechaPublicacion(fechaOriginal)
                .build();

        oferta.publicarEn(fechaOriginal.plusDays(1));

        assertEquals(fechaOriginal, oferta.getFechaPublicacion());
    }

    @Test
    void publicarRechazaDatosObligatoriosAusentes() {
        Oferta oferta = Oferta.builder().tipo("Apartamento").build();

        assertThrows(IllegalArgumentException.class,
                () -> oferta.publicarEn(LocalDateTime.now()));
    }
}
