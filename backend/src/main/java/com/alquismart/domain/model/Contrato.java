package com.alquismart.domain.model;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contrato {
    private Long id;
    private String descripcion;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private Double monto;
    private String estado;
    private Usuario usuario;
    private String solicitudId;
    private String propietarioId;
    private String inquilinoId;
    private String tituloOferta;
    private Double rentaMensual;
    private java.time.LocalDateTime fechaAceptacion;
    private String contenido;
}
