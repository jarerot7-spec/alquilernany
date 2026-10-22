package com.alquismart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.alquismart.entity.Simulacion;

import java.util.List;
import java.util.Optional;

@Repository
public interface SimulacionRepository extends JpaRepository<Simulacion, Long> {
    Optional<Simulacion> findBySolicitudId(String solicitudId);
    List<Simulacion> findByPropietarioId(String propietarioId);
    List<Simulacion> findByInquilinoId(String inquilinoId);
}
