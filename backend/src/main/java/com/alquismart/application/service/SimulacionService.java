package com.alquismart.application.service;

import com.alquismart.application.command.GuardarSimulacionCommand;
import com.alquismart.domain.repository.SimulacionRepositoryPort;
import com.alquismart.domain.model.Simulacion;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SimulacionService {
    private final SimulacionRepositoryPort simulacionRepository;

    public SimulacionService(SimulacionRepositoryPort simulacionRepository) {
        this.simulacionRepository = simulacionRepository;
    }

    public List<Simulacion> listarTodas() {
        return simulacionRepository.findAll();
    }

    public Simulacion crearOActualizar(GuardarSimulacionCommand command) {
        Simulacion datos = command.toDomain();
        datos.validarSolicitudId();
        Optional<Simulacion> existente = simulacionRepository.findBySolicitudId(datos.getSolicitudId());
        Simulacion simulacion;
        if (existente.isPresent()) {
            simulacion = existente.get();
            simulacion.redefinirCondiciones(datos, LocalDateTime.now());
        } else {
            simulacion = datos;
            simulacion.setId(null);
            simulacion.iniciarEn(LocalDateTime.now());
        }
        return simulacionRepository.save(simulacion);
    }

    public Optional<Simulacion> responder(String solicitudId, String estado, String motivoRechazo) {
        return simulacionRepository.findBySolicitudId(solicitudId).map(simulacion -> {
            return simulacion.responder(estado, motivoRechazo, LocalDateTime.now())
                    ? simulacionRepository.save(simulacion)
                    : simulacion;
        });
    }
}
