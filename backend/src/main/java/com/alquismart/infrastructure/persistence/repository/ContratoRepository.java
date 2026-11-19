package com.alquismart.infrastructure.persistence.repository;

import com.alquismart.infrastructure.persistence.entity.ContratoJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContratoRepository extends JpaRepository<ContratoJpaEntity, Long> {
    Optional<ContratoJpaEntity> findBySolicitudId(String solicitudId);
    List<ContratoJpaEntity> findByPropietarioId(String propietarioId);
    List<ContratoJpaEntity> findByInquilinoId(String inquilinoId);
}
