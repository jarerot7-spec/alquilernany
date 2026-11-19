package com.alquismart.domain.model;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Oferta {

    private Long id;

    private String propietarioId;
    private String propietarioCorreo;
    private String tipo;
    private String titulo;
    private String ubicacion;
    private String direccion;
    private String descripcion;
    private Double precio;
    private Double garantia;
    private Double mantenimiento;
    private Integer dormitorios;
    private Integer banos;
    private Double area;
    private String telefono;
    private String foto;
    private LocalDateTime fechaPublicacion;

    public void publicarEn(LocalDateTime fecha) {
        if (tipo == null || tipo.isBlank() || titulo == null || titulo.isBlank() || precio == null) {
            throw new IllegalArgumentException("Tipo, título y precio son obligatorios para publicar una oferta.");
        }
        if (precio < 0) {
            throw new IllegalArgumentException("El precio de la oferta no puede ser negativo.");
        }
        if (fechaPublicacion == null) {
            fechaPublicacion = fecha;
        }
    }
}
