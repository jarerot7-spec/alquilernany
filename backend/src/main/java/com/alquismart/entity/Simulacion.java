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
@Table(name = "simulaciones")
public class Simulacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "solicitud_id")
    private String solicitudId;

    private String propietarioId;

    private String inquilinoId;

    private String tituloOferta;

    /* =========================================
       CONDICIONES DEFINIDAS POR EL PROPIETARIO
       (se comparten con el inquilino para simular)
    ========================================= */
    private Double montoGarantia;

    private Integer diasGracia;

    private Double recargoDiario;

    private Double limiteReparacion;

    private Integer diasAviso;

    private Double penalidadSalida;

    private Integer plazoRespuesta;

    private String viaResolucion;

    /* =========================================
       ESTADO DE LA RESPUESTA DEL INQUILINO
       PENDIENTE / ACEPTADA / RECHAZADA
    ========================================= */
    private String estado;

    @Column(columnDefinition = "TEXT")
    private String motivoRechazo;

    private LocalDateTime fechaDefinida;

    private LocalDateTime fechaRespuesta;
}
