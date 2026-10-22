package com.alquismart.controller;

import com.alquismart.entity.Solicitud;
import com.alquismart.repository.SolicitudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/solicitudes")
@CrossOrigin(origins = "*")
public class SolicitudController {

    private final SolicitudRepository solicitudRepository;

    public SolicitudController(SolicitudRepository solicitudRepository) {
        this.solicitudRepository = solicitudRepository;
    }

    @GetMapping
    public ResponseEntity<List<Solicitud>> listarTodas() {
        return ResponseEntity.ok(solicitudRepository.findAll());
    }

    @GetMapping("/propietario/{idOcorreo}")
    public ResponseEntity<List<Solicitud>> listarRecibidas(@PathVariable String idOcorreo) {
        List<Solicitud> list = solicitudRepository.findByPropietarioId(idOcorreo);
        if (list.isEmpty()) {
            list = solicitudRepository.findByPropietarioCorreo(idOcorreo);
        }
        return ResponseEntity.ok(list);
    }

    @GetMapping("/solicitante/{idOcorreo}")
    public ResponseEntity<List<Solicitud>> listarEnviadas(@PathVariable String idOcorreo) {
        List<Solicitud> list = solicitudRepository.findBySolicitanteId(idOcorreo);
        if (list.isEmpty()) {
            list = solicitudRepository.findBySolicitanteCorreo(idOcorreo);
        }
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<Solicitud> crear(@RequestBody Solicitud solicitud) {
        if (solicitud.getFechaSolicitud() == null) {
            solicitud.setFechaSolicitud(LocalDateTime.now());
        }
        if (solicitud.getEstado() == null || solicitud.getEstado().isBlank()) {
            solicitud.setEstado("PENDIENTE");
        }
        Solicitud guardada = solicitudRepository.save(solicitud);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardada);
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<?> actualizarEstado(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Optional<Solicitud> opt = solicitudRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Solicitud s = opt.get();
        String nuevoEstado = body.get("estado");
        if (nuevoEstado != null) {
            s.setEstado(nuevoEstado);
            solicitudRepository.save(s);
        }
        return ResponseEntity.ok(s);
    }
}

