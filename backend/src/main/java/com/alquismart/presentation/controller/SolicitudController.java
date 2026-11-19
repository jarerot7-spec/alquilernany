package com.alquismart.presentation.controller;

import com.alquismart.application.service.SolicitudService;
import com.alquismart.presentation.dto.EstadoSolicitudRequest;
import com.alquismart.presentation.dto.SolicitudDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
@CrossOrigin(origins = "*")
public class SolicitudController {

    private final SolicitudService solicitudService;

    public SolicitudController(SolicitudService solicitudService) {
        this.solicitudService = solicitudService;
    }

    @GetMapping
    public ResponseEntity<List<SolicitudDto>> listarTodas() {
        return ResponseEntity.ok(solicitudService.listarTodas().stream().map(SolicitudDto::from).toList());
    }

    @GetMapping("/propietario/{idOcorreo}")
    public ResponseEntity<List<SolicitudDto>> listarRecibidas(@PathVariable String idOcorreo) {
        return ResponseEntity.ok(solicitudService.listarRecibidas(idOcorreo).stream().map(SolicitudDto::from).toList());
    }

    @GetMapping("/solicitante/{idOcorreo}")
    public ResponseEntity<List<SolicitudDto>> listarEnviadas(@PathVariable String idOcorreo) {
        return ResponseEntity.ok(solicitudService.listarEnviadas(idOcorreo).stream().map(SolicitudDto::from).toList());
    }

    @PostMapping
    public ResponseEntity<SolicitudDto> crear(@RequestBody SolicitudDto solicitud) {
        SolicitudDto guardada = SolicitudDto.from(solicitudService.crear(solicitud.toCommand()));
        return ResponseEntity.status(HttpStatus.CREATED).body(guardada);
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<?> actualizarEstado(@PathVariable Long id, @RequestBody EstadoSolicitudRequest request) {
        return solicitudService.actualizarEstado(id, request.estado())
                .map(SolicitudDto::from)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

