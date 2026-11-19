package com.alquismart.infrastructure.persistence.adapter;

import com.alquismart.domain.repository.OfertaRepositoryPort;
import com.alquismart.domain.model.Oferta;
import com.alquismart.infrastructure.persistence.entity.OfertaJpaEntity;
import com.alquismart.infrastructure.persistence.repository.OfertaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class OfertaRepositoryAdapter implements OfertaRepositoryPort {
    private final OfertaRepository repository;

    public OfertaRepositoryAdapter(OfertaRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Oferta> findAll() {
        return repository.findAll().stream().map(this::toDomain).toList();
    }

    @Override
    public List<Oferta> findByPropietarioId(String propietarioId) {
        return repository.findByPropietarioId(propietarioId).stream().map(this::toDomain).toList();
    }

    @Override
    public List<Oferta> findByPropietarioCorreo(String propietarioCorreo) {
        return repository.findByPropietarioCorreo(propietarioCorreo).stream().map(this::toDomain).toList();
    }

    @Override
    public Optional<Oferta> findById(Long id) {
        return repository.findById(id).map(this::toDomain);
    }

    @Override
    public Oferta save(Oferta oferta) {
        return toDomain(repository.save(toJpa(oferta)));
    }

    @Override
    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    private OfertaJpaEntity toJpa(Oferta oferta) {
        OfertaJpaEntity entity = new OfertaJpaEntity();
        entity.setId(oferta.getId());
        entity.setPropietarioId(oferta.getPropietarioId());
        entity.setPropietarioCorreo(oferta.getPropietarioCorreo());
        entity.setTipo(oferta.getTipo());
        entity.setTitulo(oferta.getTitulo());
        entity.setUbicacion(oferta.getUbicacion());
        entity.setDireccion(oferta.getDireccion());
        entity.setDescripcion(oferta.getDescripcion());
        entity.setPrecio(oferta.getPrecio());
        entity.setGarantia(oferta.getGarantia());
        entity.setMantenimiento(oferta.getMantenimiento());
        entity.setDormitorios(oferta.getDormitorios());
        entity.setBanos(oferta.getBanos());
        entity.setArea(oferta.getArea());
        entity.setTelefono(oferta.getTelefono());
        entity.setFoto(oferta.getFoto());
        entity.setFechaPublicacion(oferta.getFechaPublicacion());
        return entity;
    }

    private Oferta toDomain(OfertaJpaEntity oferta) {
        return Oferta.builder()
                .id(oferta.getId())
                .propietarioId(oferta.getPropietarioId())
                .propietarioCorreo(oferta.getPropietarioCorreo())
                .tipo(oferta.getTipo())
                .titulo(oferta.getTitulo())
                .ubicacion(oferta.getUbicacion())
                .direccion(oferta.getDireccion())
                .descripcion(oferta.getDescripcion())
                .precio(oferta.getPrecio())
                .garantia(oferta.getGarantia())
                .mantenimiento(oferta.getMantenimiento())
                .dormitorios(oferta.getDormitorios())
                .banos(oferta.getBanos())
                .area(oferta.getArea())
                .telefono(oferta.getTelefono())
                .foto(oferta.getFoto())
                .fechaPublicacion(oferta.getFechaPublicacion())
                .build();
    }
}
