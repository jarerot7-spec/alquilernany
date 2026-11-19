package com.alquismart.infrastructure.persistence.adapter;

import com.alquismart.domain.repository.SolicitudRepositoryPort;
import com.alquismart.domain.model.Solicitud;
import com.alquismart.infrastructure.persistence.entity.SolicitudJpaEntity;
import com.alquismart.infrastructure.persistence.repository.SolicitudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class SolicitudRepositoryAdapter implements SolicitudRepositoryPort {
    private final SolicitudRepository repository;

    public SolicitudRepositoryAdapter(SolicitudRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Solicitud> findAll() {
        return repository.findAll().stream().map(this::toDomain).toList();
    }

    @Override
    public List<Solicitud> findByPropietarioId(String id) {
        return repository.findByPropietarioId(id).stream().map(this::toDomain).toList();
    }

    @Override
    public List<Solicitud> findByPropietarioCorreo(String correo) {
        return repository.findByPropietarioCorreo(correo).stream().map(this::toDomain).toList();
    }

    @Override
    public List<Solicitud> findBySolicitanteId(String id) {
        return repository.findBySolicitanteId(id).stream().map(this::toDomain).toList();
    }

    @Override
    public List<Solicitud> findBySolicitanteCorreo(String correo) {
        return repository.findBySolicitanteCorreo(correo).stream().map(this::toDomain).toList();
    }

    @Override
    public Optional<Solicitud> findById(Long id) {
        return repository.findById(id).map(this::toDomain);
    }

    @Override
    public Solicitud save(Solicitud solicitud) {
        return toDomain(repository.save(toJpa(solicitud)));
    }

    private SolicitudJpaEntity toJpa(Solicitud solicitud) {
        SolicitudJpaEntity entity = new SolicitudJpaEntity();
        entity.setId(solicitud.getId());
        entity.setClientRequestId(solicitud.getClientRequestId());
        entity.setOfertaId(solicitud.getOfertaId());
        entity.setPropietarioId(solicitud.getPropietarioId());
        entity.setPropietarioCorreo(solicitud.getPropietarioCorreo());
        entity.setSolicitanteId(solicitud.getSolicitanteId());
        entity.setSolicitanteNombre(solicitud.getSolicitanteNombre());
        entity.setSolicitanteCorreo(solicitud.getSolicitanteCorreo());
        entity.setSolicitanteTelefono(solicitud.getSolicitanteTelefono());
        entity.setTituloOferta(solicitud.getTituloOferta());
        entity.setPrecioPublicado(solicitud.getPrecioPublicado());
        entity.setPrecioPropuesto(solicitud.getPrecioPropuesto());
        entity.setGarantiaPropuesta(solicitud.getGarantiaPropuesta());
        entity.setFechaIngreso(solicitud.getFechaIngreso());
        entity.setMensaje(solicitud.getMensaje());
        entity.setEstado(solicitud.getEstado());
        entity.setFechaSolicitud(solicitud.getFechaSolicitud());
        return entity;
    }

    private Solicitud toDomain(SolicitudJpaEntity solicitud) {
        return Solicitud.builder()
                .id(solicitud.getId())
                .clientRequestId(solicitud.getClientRequestId())
                .ofertaId(solicitud.getOfertaId())
                .propietarioId(solicitud.getPropietarioId())
                .propietarioCorreo(solicitud.getPropietarioCorreo())
                .solicitanteId(solicitud.getSolicitanteId())
                .solicitanteNombre(solicitud.getSolicitanteNombre())
                .solicitanteCorreo(solicitud.getSolicitanteCorreo())
                .solicitanteTelefono(solicitud.getSolicitanteTelefono())
                .tituloOferta(solicitud.getTituloOferta())
                .precioPublicado(solicitud.getPrecioPublicado())
                .precioPropuesto(solicitud.getPrecioPropuesto())
                .garantiaPropuesta(solicitud.getGarantiaPropuesta())
                .fechaIngreso(solicitud.getFechaIngreso())
                .mensaje(solicitud.getMensaje())
                .estado(solicitud.getEstado())
                .fechaSolicitud(solicitud.getFechaSolicitud())
                .build();
    }
}
