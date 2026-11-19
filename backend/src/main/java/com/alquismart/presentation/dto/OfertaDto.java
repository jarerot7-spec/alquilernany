package com.alquismart.presentation.dto;

import com.alquismart.application.command.CrearOfertaCommand;
import com.alquismart.domain.model.Oferta;

import java.time.LocalDateTime;

public record OfertaDto(
        Long id,
        String propietarioId,
        String propietarioCorreo,
        String tipo,
        String titulo,
        String ubicacion,
        String direccion,
        String descripcion,
        Double precio,
        Double garantia,
        Double mantenimiento,
        Integer dormitorios,
        Integer banos,
        Double area,
        String telefono,
        String foto,
        LocalDateTime fechaPublicacion
) {
    public CrearOfertaCommand toCommand() {
        return new CrearOfertaCommand(id, propietarioId, propietarioCorreo, tipo, titulo, ubicacion,
                direccion, descripcion, precio, garantia, mantenimiento, dormitorios, banos, area,
                telefono, foto, fechaPublicacion);
    }

    public static OfertaDto from(Oferta oferta) {
        return new OfertaDto(oferta.getId(), oferta.getPropietarioId(), oferta.getPropietarioCorreo(),
                oferta.getTipo(), oferta.getTitulo(), oferta.getUbicacion(), oferta.getDireccion(),
                oferta.getDescripcion(), oferta.getPrecio(), oferta.getGarantia(), oferta.getMantenimiento(),
                oferta.getDormitorios(), oferta.getBanos(), oferta.getArea(), oferta.getTelefono(),
                oferta.getFoto(), oferta.getFechaPublicacion());
    }
}
