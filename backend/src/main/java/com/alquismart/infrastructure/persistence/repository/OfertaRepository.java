package com.alquismart.infrastructure.persistence.repository;

import com.alquismart.infrastructure.persistence.entity.OfertaJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfertaRepository extends JpaRepository<OfertaJpaEntity, Long> {
    List<OfertaJpaEntity> findByPropietarioId(String propietarioId);
    List<OfertaJpaEntity> findByPropietarioCorreo(String propietarioCorreo);
}
