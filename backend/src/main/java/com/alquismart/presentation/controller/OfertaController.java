package com.alquismart.presentation.controller;

import com.alquismart.application.service.OfertaService;
import com.alquismart.presentation.dto.OfertaDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ofertas")
@CrossOrigin(origins = "*")
public class OfertaController {

    private final OfertaService ofertaService;

    public OfertaController(OfertaService ofertaService) {
        this.ofertaService = ofertaService;
    }

    @GetMapping
    public ResponseEntity<List<OfertaDto>> listarTodas() {
        return ResponseEntity.ok(ofertaService.listarTodas().stream().map(OfertaDto::from).toList());
    }

    @GetMapping("/propietario/{propietarioId}")
    public ResponseEntity<List<OfertaDto>> listarPorPropietario(@PathVariable String propietarioId) {
        return ResponseEntity.ok(ofertaService.listarPorPropietario(propietarioId).stream().map(OfertaDto::from).toList());
    }

    @PostMapping
    public ResponseEntity<OfertaDto> crear(@RequestBody OfertaDto oferta) {
        OfertaDto guardada = OfertaDto.from(ofertaService.crear(oferta.toCommand()));
        return ResponseEntity.status(HttpStatus.CREATED).body(guardada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (ofertaService.eliminar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
