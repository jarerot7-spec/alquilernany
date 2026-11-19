package com.alquismart.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "ofertas")
@Getter
@Setter
@NoArgsConstructor
public class OfertaJpaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String propietarioId;
    private String propietarioCorreo;
    @Column(nullable = false)
    private String tipo;
    @Column(nullable = false)
    private String titulo;
    private String ubicacion;
    private String direccion;
    @Column(columnDefinition = "LONGTEXT")
    private String descripcion;
    @Column(nullable = false)
    private Double precio;
    private Double garantia;
    private Double mantenimiento;
    private Integer dormitorios;
    private Integer banos;
    private Double area;
    private String telefono;
    @Column(columnDefinition = "LONGTEXT")
    private String foto;
    private LocalDateTime fechaPublicacion;
}
