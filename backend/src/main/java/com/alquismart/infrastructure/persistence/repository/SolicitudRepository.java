package com.alquismart.infrastructure.persistence.repository;

import com.alquismart.infrastructure.persistence.entity.SolicitudJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolicitudRepository extends JpaRepository<SolicitudJpaEntity, Long> {
    List<SolicitudJpaEntity> findByPropietarioId(String propietarioId);
    List<SolicitudJpaEntity> findByPropietarioCorreo(String propietarioCorreo);
    List<SolicitudJpaEntity> findBySolicitanteId(String solicitanteId);
    List<SolicitudJpaEntity> findBySolicitanteCorreo(String solicitanteCorreo);
}

