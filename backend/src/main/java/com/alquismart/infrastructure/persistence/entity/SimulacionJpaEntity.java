package com.alquismart.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "simulaciones")
@Getter
@Setter
@NoArgsConstructor
public class SimulacionJpaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "solicitud_id")
    private String solicitudId;
    private String propietarioId;
    private String inquilinoId;
    private String tituloOferta;
    private Double montoGarantia;
    private Integer diasGracia;
    private Double recargoDiario;
    private Double limiteReparacion;
    private Integer diasAviso;
    private Double penalidadSalida;
    private Integer plazoRespuesta;
    private String viaResolucion;
    private String estado;
    @Column(columnDefinition = "TEXT")
    private String motivoRechazo;
    private LocalDateTime fechaDefinida;
    private LocalDateTime fechaRespuesta;
}
