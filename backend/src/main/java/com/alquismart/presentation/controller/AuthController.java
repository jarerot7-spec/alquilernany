package com.alquismart.presentation.controller;

import com.alquismart.application.service.AuthService;
import com.alquismart.application.command.LoginCommand;
import com.alquismart.application.command.RegistrarUsuarioCommand;
import com.alquismart.presentation.dto.LoginRequest;
import com.alquismart.presentation.dto.RegistroRequest;
import com.alquismart.domain.model.Usuario;
import com.alquismart.presentation.dto.AuthResponse;
import com.alquismart.presentation.dto.UsuarioResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registrar(@RequestBody RegistroRequest request) {
        RegistrarUsuarioCommand command = new RegistrarUsuarioCommand(
                request.getNombre(),
                request.getApellido(),
                request.getDni(),
                request.getCorreo(),
                request.getTelefono(),
                request.getPassword()
        );
        Usuario usuario = authService.registrar(command);
        return ResponseEntity.status(201)
                .body(new AuthResponse("Cuenta creada correctamente.", UsuarioResponse.from(usuario)));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        Usuario usuario = authService.login(new LoginCommand(request.getCorreo(), request.getPassword()));
        return ResponseEntity.ok(new AuthResponse("Inicio de sesión correcto.", UsuarioResponse.from(usuario)));
    }
}
