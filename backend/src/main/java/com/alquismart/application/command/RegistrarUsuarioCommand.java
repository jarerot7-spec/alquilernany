package com.alquismart.application.command;

public record RegistrarUsuarioCommand(
        String nombre,
        String apellido,
        String dni,
        String correo,
        String telefono,
        String password
) {
}
