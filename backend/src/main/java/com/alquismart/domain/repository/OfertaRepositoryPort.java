package com.alquismart.domain.repository;

import com.alquismart.domain.model.Oferta;

import java.util.List;
import java.util.Optional;

public interface OfertaRepositoryPort {
    List<Oferta> findAll();
    List<Oferta> findByPropietarioId(String propietarioId);
    List<Oferta> findByPropietarioCorreo(String propietarioCorreo);
    Optional<Oferta> findById(Long id);
    Oferta save(Oferta oferta);
    boolean existsById(Long id);
    void deleteById(Long id);
}
