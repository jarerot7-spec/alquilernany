package com.alquismart.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "contratos")
public class ContratoJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String descripcion;

    @Column(name = "fecha_inicio", nullable = true)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = true)
    private LocalDate fechaFin;

    @Column(nullable = true)
    private Double monto;

    @Column(nullable = true)
    private String estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = true)
    private UsuarioJpaEntity usuario;

    @Column(name = "solicitud_id", unique = true)
    private String solicitudId;

    @Column(name = "propietario_id")
    private String propietarioId;

    @Column(name = "inquilino_id")
    private String inquilinoId;

    @Column(name = "titulo_oferta")
    private String tituloOferta;

    @Column(name = "renta_mensual")
    private Double rentaMensual;

    @Column(name = "fecha_aceptacion")
    private java.time.LocalDateTime fechaAceptacion;

    @Column(name = "contenido", columnDefinition = "TEXT")
    private String contenido;
}

