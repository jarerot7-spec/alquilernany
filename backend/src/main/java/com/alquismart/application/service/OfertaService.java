package com.alquismart.application.service;

import com.alquismart.application.command.CrearOfertaCommand;
import com.alquismart.domain.repository.OfertaRepositoryPort;
import com.alquismart.domain.model.Oferta;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OfertaService {
    private final OfertaRepositoryPort ofertaRepository;

    public OfertaService(OfertaRepositoryPort ofertaRepository) {
        this.ofertaRepository = ofertaRepository;
    }

    public List<Oferta> listarTodas() {
        return ofertaRepository.findAll();
    }

    public List<Oferta> listarPorPropietario(String propietarioId) {
        return ofertaRepository.findByPropietarioId(propietarioId);
    }

    public Oferta crear(CrearOfertaCommand command) {
        Oferta oferta = command.toDomain();
        oferta.publicarEn(LocalDateTime.now());
        return ofertaRepository.save(oferta);
    }

    public boolean eliminar(Long id) {
        if (!ofertaRepository.existsById(id)) {
            return false;
        }
        ofertaRepository.deleteById(id);
        return true;
    }
}
