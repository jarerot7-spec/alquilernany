package com.alquismart.presentation.controller;

import com.alquismart.application.service.ContratoService;
import com.alquismart.presentation.dto.ContratoDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contratos")
@CrossOrigin(origins = "*")
public class ContratoController {
    private final ContratoService contratoService;

    public ContratoController(ContratoService contratoService) {
        this.contratoService = contratoService;
    }

    @GetMapping
    public ResponseEntity<List<ContratoDto>> listarTodas() {
        return ResponseEntity.ok(contratoService.listarTodas().stream().map(ContratoDto::from).toList());
    }

    @GetMapping("/usuario/{idOcorreo}")
    public ResponseEntity<List<ContratoDto>> listarPorUsuario(@PathVariable String idOcorreo) {
        return ResponseEntity.ok(contratoService.listarPorUsuario(idOcorreo).stream().map(ContratoDto::from).toList());
    }

    @GetMapping("/solicitud/{solicitudId}")
    public ResponseEntity<ContratoDto> obtenerPorSolicitud(@PathVariable String solicitudId) {
        return contratoService.obtenerPorSolicitud(solicitudId)
                .map(ContratoDto::from)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ContratoDto> crearOActualizar(@RequestBody ContratoDto contrato) {
        ContratoDto guardado = ContratoDto.from(contratoService.crearOActualizar(contrato));
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }
}
