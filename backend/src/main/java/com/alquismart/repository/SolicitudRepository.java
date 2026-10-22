package com.alquismart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.alquismart.entity.Solicitud;

import java.util.List;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {
    List<Solicitud> findByPropietarioId(String propietarioId);
    List<Solicitud> findByPropietarioCorreo(String propietarioCorreo);
    List<Solicitud> findBySolicitanteId(String solicitanteId);
    List<Solicitud> findBySolicitanteCorreo(String solicitanteCorreo);
}

