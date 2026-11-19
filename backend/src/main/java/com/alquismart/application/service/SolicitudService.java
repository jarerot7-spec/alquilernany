package com.alquismart.application.service;

import com.alquismart.application.command.CrearSolicitudCommand;
import com.alquismart.domain.repository.SolicitudRepositoryPort;
import com.alquismart.domain.model.Solicitud;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SolicitudService {
    private final SolicitudRepositoryPort solicitudRepository;

    public SolicitudService(SolicitudRepositoryPort solicitudRepository) {
        this.solicitudRepository = solicitudRepository;
    }

    public List<Solicitud> listarTodas() {
        return solicitudRepository.findAll();
    }

    public List<Solicitud> listarRecibidas(String idOcorreo) {
        List<Solicitud> solicitudes = solicitudRepository.findByPropietarioId(idOcorreo);
        return solicitudes.isEmpty()
                ? solicitudRepository.findByPropietarioCorreo(idOcorreo)
                : solicitudes;
    }

    public List<Solicitud> listarEnviadas(String idOcorreo) {
        List<Solicitud> solicitudes = solicitudRepository.findBySolicitanteId(idOcorreo);
        return solicitudes.isEmpty()
                ? solicitudRepository.findBySolicitanteCorreo(idOcorreo)
                : solicitudes;
    }

    public Solicitud crear(CrearSolicitudCommand command) {
        Solicitud solicitud = command.toDomain();
        solicitud.registrarEn(LocalDateTime.now());
        return solicitudRepository.save(solicitud);
    }

    public Optional<Solicitud> actualizarEstado(Long id, String estado) {
        return solicitudRepository.findById(id).map(solicitud -> {
            if (estado != null) {
                solicitud.setEstado(estado);
                return solicitudRepository.save(solicitud);
            }
            return solicitud;
        });
    }
}
