package com.alquismart.presentation.dto;

import com.alquismart.domain.model.Usuario;

public record UsuarioResponse(
        Long id,
        String nombre,
        String apellido,
        String dni,
        String correo,
        String telefono,
        String rol
) {
    public static UsuarioResponse from(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getDni(),
                usuario.getCorreo(),
                usuario.getTelefono(),
                usuario.getRol()
        );
    }
}
