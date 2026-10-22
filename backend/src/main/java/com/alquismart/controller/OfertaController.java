package com.alquismart.controller;

import com.alquismart.entity.Oferta;
import com.alquismart.repository.OfertaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/ofertas")
@CrossOrigin(origins = "*")
public class OfertaController {

    private final OfertaRepository ofertaRepository;

    public OfertaController(OfertaRepository ofertaRepository) {
        this.ofertaRepository = ofertaRepository;
    }

    @GetMapping
    public ResponseEntity<List<Oferta>> listarTodas() {
        return ResponseEntity.ok(ofertaRepository.findAll());
    }

    @GetMapping("/propietario/{propietarioId}")
    public ResponseEntity<List<Oferta>> listarPorPropietario(@PathVariable String propietarioId) {
        return ResponseEntity.ok(ofertaRepository.findByPropietarioId(propietarioId));
    }

    @PostMapping
    public ResponseEntity<Oferta> crear(@RequestBody Oferta oferta) {
        if (oferta.getFechaPublicacion() == null) {
            oferta.setFechaPublicacion(LocalDateTime.now());
        }
        Oferta guardada = ofertaRepository.save(oferta);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (ofertaRepository.existsById(id)) {
            ofertaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
