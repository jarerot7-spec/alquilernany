package com.alquismart.infrastructure.persistence.adapter;

import com.alquismart.domain.repository.UsuarioRepositoryPort;
import com.alquismart.domain.model.Usuario;
import com.alquismart.infrastructure.persistence.entity.UsuarioJpaEntity;
import com.alquismart.infrastructure.persistence.repository.UsuarioRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UsuarioRepositoryAdapter implements UsuarioRepositoryPort {
    private final UsuarioRepository repository;

    public UsuarioRepositoryAdapter(UsuarioRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Usuario> findByCorreo(String correo) {
        return repository.findByCorreo(correo).map(this::toDomain);
    }

    @Override
    public boolean existsByCorreo(String correo) {
        return repository.existsByCorreo(correo);
    }

    @Override
    public Usuario save(Usuario usuario) {
        UsuarioJpaEntity saved = repository.save(toJpa(usuario));
        return toDomain(saved);
    }

    @Override
    public List<Usuario> findAll() {
        return repository.findAll().stream().map(this::toDomain).toList();
    }

    private UsuarioJpaEntity toJpa(Usuario usuario) {
        UsuarioJpaEntity entity = new UsuarioJpaEntity();
        entity.setId(usuario.getId());
        entity.setNombre(usuario.getNombre());
        entity.setApellido(usuario.getApellido());
        entity.setDni(usuario.getDni());
        entity.setCorreo(usuario.getCorreo());
        entity.setTelefono(usuario.getTelefono());
        entity.setPassword(usuario.getPassword());
        entity.setRol(usuario.getRol());
        return entity;
    }

    private Usuario toDomain(UsuarioJpaEntity usuario) {
        return Usuario.builder()
                .id(usuario.getId())
                .nombre(usuario.getNombre())
                .apellido(usuario.getApellido())
                .dni(usuario.getDni())
                .correo(usuario.getCorreo())
                .telefono(usuario.getTelefono())
                .password(usuario.getPassword())
                .rol(usuario.getRol())
                .build();
    }
}
