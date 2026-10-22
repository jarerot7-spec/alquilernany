package com.alquismart.controller;

import com.alquismart.entity.Simulacion;
import com.alquismart.repository.SimulacionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/simulaciones")
@CrossOrigin(origins = "*")
public class SimulacionController {

    private final SimulacionRepository simulacionRepository;

    public SimulacionController(SimulacionRepository simulacionRepository) {
        this.simulacionRepository = simulacionRepository;
    }

    @GetMapping
    public ResponseEntity<List<Simulacion>> listarTodas() {
        return ResponseEntity.ok(simulacionRepository.findAll());
    }

    /**
     * Crea o actualiza las condiciones de una simulación.
     * Lo usa el PROPIETARIO para definir las reglas. Cada vez que se
     * re-definen, el estado de aceptación vuelve a PENDIENTE.
     */
    @PostMapping
    public ResponseEntity<?> crearOActualizar(@RequestBody Simulacion simulacion) {
        if (simulacion.getSolicitudId() == null || simulacion.getSolicitudId().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "solicitudId es obligatorio"));
        }

        Optional<Simulacion> existente = simulacionRepository.findBySolicitudId(simulacion.getSolicitudId());
        Simulacion entidad;

        if (existente.isPresent()) {
            entidad = existente.get();
            entidad.setPropietarioId(simulacion.getPropietarioId());
            entidad.setInquilinoId(simulacion.getInquilinoId());
            entidad.setTituloOferta(simulacion.getTituloOferta());
            entidad.setMontoGarantia(simulacion.getMontoGarantia());
            entidad.setDiasGracia(simulacion.getDiasGracia());
            entidad.setRecargoDiario(simulacion.getRecargoDiario());
            entidad.setLimiteReparacion(simulacion.getLimiteReparacion());
            entidad.setDiasAviso(simulacion.getDiasAviso());
            entidad.setPenalidadSalida(simulacion.getPenalidadSalida());
            entidad.setPlazoRespuesta(simulacion.getPlazoRespuesta());
            entidad.setViaResolucion(simulacion.getViaResolucion());
            // Al redefinir condiciones se reinicia la negociación
            entidad.setEstado("PENDIENTE");
            entidad.setMotivoRechazo(null);
            entidad.setFechaRespuesta(null);
            entidad.setFechaDefinida(LocalDateTime.now());
        } else {
            entidad = simulacion;
            entidad.setId(null);
            if (entidad.getEstado() == null || entidad.getEstado().isBlank()) {
                entidad.setEstado("PENDIENTE");
            }
            entidad.setFechaDefinida(LocalDateTime.now());
        }

        return ResponseEntity.ok(simulacionRepository.save(entidad));
    }

    /**
     * Registra la respuesta del INQUILINO a las condiciones.
     * estado = ACEPTADA o RECHAZADA.
     */
    @PatchMapping("/solicitud/{solicitudId}/respuesta")
    public ResponseEntity<?> responder(@PathVariable String solicitudId, @RequestBody Map<String, String> body) {
        Optional<Simulacion> opt = simulacionRepository.findBySolicitudId(solicitudId);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Simulacion s = opt.get();
        String estado = body.get("estado");
        if (estado != null && (estado.equals("ACEPTADA") || estado.equals("RECHAZADA"))) {
            s.setEstado(estado);
            s.setMotivoRechazo(body.get("motivoRechazo"));
            s.setFechaRespuesta(LocalDateTime.now());
            simulacionRepository.save(s);
        }
        return ResponseEntity.ok(s);
    }
}
