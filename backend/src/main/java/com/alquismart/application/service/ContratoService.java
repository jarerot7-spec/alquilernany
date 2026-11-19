package com.alquismart.application.service;

import com.alquismart.infrastructure.persistence.entity.ContratoJpaEntity;
import com.alquismart.infrastructure.persistence.repository.ContratoRepository;
import com.alquismart.infrastructure.persistence.repository.UsuarioRepository;
import com.alquismart.presentation.dto.ContratoDto;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContratoService {
    private final ContratoRepository contratoRepository;
    private final UsuarioRepository usuarioRepository;

    public ContratoService(ContratoRepository contratoRepository, UsuarioRepository usuarioRepository) {
        this.contratoRepository = contratoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<ContratoJpaEntity> listarTodas() {
        return contratoRepository.findAll();
    }

    public List<ContratoJpaEntity> listarPorUsuario(String idOcorreo) {
        var recibidos = contratoRepository.findByPropietarioId(idOcorreo);
        var enviados = contratoRepository.findByInquilinoId(idOcorreo);
        recibidos.addAll(enviados.stream()
                .filter(item -> recibidos.stream().noneMatch(r -> r.getId().equals(item.getId())))
                .toList());
        return recibidos;
    }

    public ContratoJpaEntity crearOActualizar(ContratoDto dto) {
        ContratoJpaEntity entity = contratoRepository.findBySolicitudId(dto.solicitudId())
                .orElse(new ContratoJpaEntity());
        entity.setSolicitudId(dto.solicitudId());
        entity.setPropietarioId(dto.propietarioId());
        entity.setInquilinoId(dto.inquilinoId());
        entity.setTituloOferta(dto.tituloOferta());
        entity.setDescripcion(dto.tituloOferta());
        entity.setRentaMensual(dto.rentaMensual());
        entity.setMonto(dto.rentaMensual());
        entity.setEstado(dto.estado() == null ? "ACEPTADO" : dto.estado());
        LocalDateTime fechaAceptacion = dto.fechaAceptacion() == null ? LocalDateTime.now() : dto.fechaAceptacion();
        entity.setFechaAceptacion(fechaAceptacion);
        entity.setFechaInicio(java.time.LocalDate.now());
        entity.setFechaFin(java.time.LocalDate.now().plusYears(1));
        try {
            Long usuarioId = Long.parseLong(dto.inquilinoId());
            usuarioRepository.findById(usuarioId).ifPresent(entity::setUsuario);
        } catch (NumberFormatException ignored) {
            usuarioRepository.findAll().stream().findFirst().ifPresent(entity::setUsuario);
        }
        entity.setContenido(dto.contenido());
        return contratoRepository.save(entity);
    }

    public Optional<ContratoJpaEntity> obtenerPorSolicitud(String solicitudId) {
        return contratoRepository.findBySolicitudId(solicitudId);
    }
}
