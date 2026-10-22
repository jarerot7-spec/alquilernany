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
@Table(name = "solicitudes")
public class Solicitud {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clientRequestId;

    private String ofertaId;

    private String propietarioId;

    private String propietarioCorreo;

    private String solicitanteId;

    private String solicitanteNombre;

    private String solicitanteCorreo;

    private String solicitanteTelefono;

    private String tituloOferta;

    private Double precioPublicado;

    private Double precioPropuesto;

    private Double garantiaPropuesta;

    private String fechaIngreso;

    @Column(columnDefinition = "LONGTEXT")
    private String mensaje;

    private String estado;

    private LocalDateTime fechaSolicitud;
}

