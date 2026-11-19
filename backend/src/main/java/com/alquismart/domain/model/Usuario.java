package com.alquismart.domain.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    private Long id;

    private String nombre;

    private String apellido;

    private String dni;

    private String correo;

    private String telefono;

    private String password;

    private String rol;

    public static Usuario registrar(String nombre, String apellido, String dni, String correo,
                                    String telefono, String password) {
        if (nombre == null || nombre.isBlank()
                || apellido == null || apellido.isBlank()
                || correo == null || correo.isBlank()
                || password == null || password.isBlank()) {
            throw new IllegalArgumentException("Nombre, apellido, correo y contraseña son obligatorios.");
        }
        return Usuario.builder()
                .nombre(nombre)
                .apellido(apellido)
                .dni(dni)
                .correo(correo)
                .telefono(telefono)
                .password(password)
                .rol("USUARIO")
                .build();
    }
}
