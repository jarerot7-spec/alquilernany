package com.alquismart.domain.model;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Solicitud {

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
    private String mensaje;
    private String estado;

    private LocalDateTime fechaSolicitud;

    public void registrarEn(LocalDateTime fecha) {
        if (fechaSolicitud == null) {
            fechaSolicitud = fecha;
        }
        if (estado == null || estado.isBlank()) {
            estado = "PENDIENTE";
        }
    }
}

