package com.alquismart.domain.model;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Incidencia {
    private Long id;
    private String titulo;
    private String descripcion;
    private LocalDate fechaCreacion;
    private Usuario usuario;
}
