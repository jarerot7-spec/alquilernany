package com.alquismart.infrastructure.persistence.adapter;

import com.alquismart.domain.repository.SimulacionRepositoryPort;
import com.alquismart.domain.model.Simulacion;
import com.alquismart.infrastructure.persistence.entity.SimulacionJpaEntity;
import com.alquismart.infrastructure.persistence.repository.SimulacionRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class SimulacionRepositoryAdapter implements SimulacionRepositoryPort {
    private final SimulacionRepository repository;

    public SimulacionRepositoryAdapter(SimulacionRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Simulacion> findAll() {
        return repository.findAll().stream().map(this::toDomain).toList();
    }

    @Override
    public Optional<Simulacion> findBySolicitudId(String solicitudId) {
        return repository.findBySolicitudId(solicitudId).map(this::toDomain);
    }

    @Override
    public List<Simulacion> findByPropietarioId(String propietarioId) {
        return repository.findByPropietarioId(propietarioId).stream().map(this::toDomain).toList();
    }

    @Override
    public List<Simulacion> findByInquilinoId(String inquilinoId) {
        return repository.findByInquilinoId(inquilinoId).stream().map(this::toDomain).toList();
    }

    @Override
    public Simulacion save(Simulacion simulacion) {
        return toDomain(repository.save(toJpa(simulacion)));
    }

    private SimulacionJpaEntity toJpa(Simulacion simulacion) {
        SimulacionJpaEntity entity = new SimulacionJpaEntity();
        entity.setId(simulacion.getId());
        entity.setSolicitudId(simulacion.getSolicitudId());
        entity.setPropietarioId(simulacion.getPropietarioId());
        entity.setInquilinoId(simulacion.getInquilinoId());
        entity.setTituloOferta(simulacion.getTituloOferta());
        entity.setMontoGarantia(simulacion.getMontoGarantia());
        entity.setDiasGracia(simulacion.getDiasGracia());
        entity.setRecargoDiario(simulacion.getRecargoDiario());
        entity.setLimiteReparacion(simulacion.getLimiteReparacion());
        entity.setDiasAviso(simulacion.getDiasAviso());
        entity.setPenalidadSalida(simulacion.getPenalidadSalida());
        entity.setPlazoRespuesta(simulacion.getPlazoRespuesta());
        entity.setViaResolucion(simulacion.getViaResolucion());
        entity.setEstado(simulacion.getEstado());
        entity.setMotivoRechazo(simulacion.getMotivoRechazo());
        entity.setFechaDefinida(simulacion.getFechaDefinida());
        entity.setFechaRespuesta(simulacion.getFechaRespuesta());
        return entity;
    }

    private Simulacion toDomain(SimulacionJpaEntity simulacion) {
        return Simulacion.builder()
                .id(simulacion.getId())
                .solicitudId(simulacion.getSolicitudId())
                .propietarioId(simulacion.getPropietarioId())
                .inquilinoId(simulacion.getInquilinoId())
                .tituloOferta(simulacion.getTituloOferta())
                .montoGarantia(simulacion.getMontoGarantia())
                .diasGracia(simulacion.getDiasGracia())
                .recargoDiario(simulacion.getRecargoDiario())
                .limiteReparacion(simulacion.getLimiteReparacion())
                .diasAviso(simulacion.getDiasAviso())
                .penalidadSalida(simulacion.getPenalidadSalida())
                .plazoRespuesta(simulacion.getPlazoRespuesta())
                .viaResolucion(simulacion.getViaResolucion())
                .estado(simulacion.getEstado())
                .motivoRechazo(simulacion.getMotivoRechazo())
                .fechaDefinida(simulacion.getFechaDefinida())
                .fechaRespuesta(simulacion.getFechaRespuesta())
                .build();
    }
}
