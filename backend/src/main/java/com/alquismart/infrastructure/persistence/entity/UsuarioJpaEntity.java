package com.alquismart.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
public class UsuarioJpaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nombre;
    @Column(nullable = false)
    private String apellido;
    @Column(length = 20)
    private String dni;
    @Column(nullable = false, unique = true)
    private String correo;
    @Column(length = 20)
    private String telefono;
    @Column(nullable = false)
    private String password;
    @Column(length = 50)
    private String rol;
}
