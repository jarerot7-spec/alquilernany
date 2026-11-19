package com.alquismart.presentation.controller;

import com.alquismart.application.service.SimulacionService;
import com.alquismart.presentation.dto.RespuestaSimulacionRequest;
import com.alquismart.presentation.dto.SimulacionDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/simulaciones")
@CrossOrigin(origins = "*")
public class SimulacionController {

    private final SimulacionService simulacionService;

    public SimulacionController(SimulacionService simulacionService) {
        this.simulacionService = simulacionService;
    }

    @GetMapping
    public ResponseEntity<List<SimulacionDto>> listarTodas() {
        return ResponseEntity.ok(simulacionService.listarTodas().stream().map(SimulacionDto::from).toList());
    }

    /**
     * Crea o actualiza las condiciones de una simulación.
     * Lo usa el PROPIETARIO para definir las reglas. Cada vez que se
     * re-definen, el estado de aceptación vuelve a PENDIENTE.
     */
    @PostMapping
    public ResponseEntity<SimulacionDto> crearOActualizar(@RequestBody SimulacionDto simulacion) {
        return ResponseEntity.ok(SimulacionDto.from(simulacionService.crearOActualizar(simulacion.toCommand())));
    }

    /**
     * Registra la respuesta del INQUILINO a las condiciones.
     * estado = ACEPTADA o RECHAZADA.
     */
    @PatchMapping("/solicitud/{solicitudId}/respuesta")
    public ResponseEntity<?> responder(@PathVariable String solicitudId, @RequestBody RespuestaSimulacionRequest request) {
        return simulacionService.responder(solicitudId, request.estado(), request.motivoRechazo())
                .map(SimulacionDto::from)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
