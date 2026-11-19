package com.alquismart.domain.repository;

import com.alquismart.domain.model.Simulacion;

import java.util.List;
import java.util.Optional;

public interface SimulacionRepositoryPort {
    List<Simulacion> findAll();
    Optional<Simulacion> findBySolicitudId(String solicitudId);
    List<Simulacion> findByPropietarioId(String propietarioId);
    List<Simulacion> findByInquilinoId(String inquilinoId);
    Simulacion save(Simulacion simulacion);
}
