package com.alquismart.application.service;

import com.alquismart.application.command.LoginCommand;
import com.alquismart.application.command.RegistrarUsuarioCommand;
import com.alquismart.domain.model.Usuario;
import com.alquismart.domain.repository.UsuarioRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UsuarioRepositoryPort usuarioRepository;

    public AuthService(UsuarioRepositoryPort usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario registrar(RegistrarUsuarioCommand request) {
        if (usuarioRepository.existsByCorreo(request.correo())) {
            throw new IllegalArgumentException("Ya existe una cuenta con este correo.");
        }

        Usuario usuario = Usuario.registrar(request.nombre(), request.apellido(), request.dni(),
                request.correo(), request.telefono(), request.password());
        return usuarioRepository.save(usuario);
    }

    public Usuario login(LoginCommand request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(request.correo());
        if (usuarioOpt.isEmpty() || !usuarioOpt.get().getPassword().equals(request.password())) {
            throw new IllegalArgumentException("Correo o contraseña incorrectos.");
        }
        return usuarioOpt.get();
    }
}
