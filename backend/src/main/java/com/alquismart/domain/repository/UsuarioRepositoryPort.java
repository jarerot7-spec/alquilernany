package com.alquismart.domain.repository;

import com.alquismart.domain.model.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepositoryPort {
    Optional<Usuario> findByCorreo(String correo);
    boolean existsByCorreo(String correo);
    Usuario save(Usuario usuario);
    List<Usuario> findAll();
}
