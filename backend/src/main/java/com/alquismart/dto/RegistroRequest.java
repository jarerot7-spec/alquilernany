package com.alquismart.dto;

import lombok.Data;

@Data
public class RegistroRequest {
    private String nombre;
    private String apellido;
    private String dni;
    private String correo;
    private String telefono;
    private String password;
}
