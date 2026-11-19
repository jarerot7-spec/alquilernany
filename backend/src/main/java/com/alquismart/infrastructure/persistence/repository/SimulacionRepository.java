package com.alquismart.infrastructure.persistence.repository;

import com.alquismart.infrastructure.persistence.entity.SimulacionJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SimulacionRepository extends JpaRepository<SimulacionJpaEntity, Long> {
    Optional<SimulacionJpaEntity> findBySolicitudId(String solicitudId);
    List<SimulacionJpaEntity> findByPropietarioId(String propietarioId);
    List<SimulacionJpaEntity> findByInquilinoId(String inquilinoId);
}
