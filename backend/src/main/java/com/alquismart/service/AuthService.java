package com.alquismart.service;

import com.alquismart.dto.LoginRequest;
import com.alquismart.dto.RegistroRequest;
import com.alquismart.entity.Usuario;
import com.alquismart.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;

    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario registrar(RegistroRequest request) {
        if (usuarioRepository.existsByCorreo(request.getCorreo())) {
            throw new IllegalArgumentException("Ya existe una cuenta con este correo.");
        }

        Usuario usuario = Usuario.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .dni(request.getDni())
                .correo(request.getCorreo())
                .telefono(request.getTelefono())
                .password(request.getPassword())
                .rol("USUARIO")
                .build();

        return usuarioRepository.save(usuario);
    }

    public Usuario login(LoginRequest request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(request.getCorreo());
        if (usuarioOpt.isEmpty() || !usuarioOpt.get().getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("Correo o contraseña incorrectos.");
        }
        return usuarioOpt.get();
    }
}
