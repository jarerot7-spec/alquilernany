package com.alquismart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.alquismart.entity.Oferta;

import java.util.List;

@Repository
public interface OfertaRepository extends JpaRepository<Oferta, Long> {
    List<Oferta> findByPropietarioId(String propietarioId);
    List<Oferta> findByPropietarioCorreo(String propietarioCorreo);
}
