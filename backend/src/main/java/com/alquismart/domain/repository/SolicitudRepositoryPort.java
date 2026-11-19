package com.alquismart.domain.repository;

import com.alquismart.domain.model.Solicitud;

import java.util.List;
import java.util.Optional;

public interface SolicitudRepositoryPort {
    List<Solicitud> findAll();
    List<Solicitud> findByPropietarioId(String propietarioId);
    List<Solicitud> findByPropietarioCorreo(String propietarioCorreo);
    List<Solicitud> findBySolicitanteId(String solicitanteId);
    List<Solicitud> findBySolicitanteCorreo(String solicitanteCorreo);
    Optional<Solicitud> findById(Long id);
    Solicitud save(Solicitud solicitud);
}
