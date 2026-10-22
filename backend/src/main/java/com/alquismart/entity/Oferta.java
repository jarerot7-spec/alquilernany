package com.alquismart.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "ofertas")
public class Oferta {

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
