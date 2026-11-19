package com.alquismart.domain.model;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mediacion {
    private Long id;
    private String asunto;
    private String detalle;
    private LocalDate fechaCreacion;
    private Usuario usuario;
}
