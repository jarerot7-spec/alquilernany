/* =========================================
   NANYSMART - LOGIN
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("loginForm");

    const mensaje =
        document.getElementById("loginMensaje");

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const correo =
            document
                .getElementById("correo")
                .value
                .trim();

        const password =
            document
                .getElementById("password")
                .value;

        mensaje.textContent = "";
        mensaje.className = "form-message";

        /* =========================
           ENVIAR A SPRING BOOT / MYSQL
        ========================== */
        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correo,
                    password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                mensaje.textContent = data.error || "Correo o contraseña incorrectos.";
                mensaje.className = "form-message error";
                return;
            }

            const usuario = data.usuario;
            if (!usuario.roles) {
                usuario.roles = ["PROPIETARIO", "INQUILINO"];
            }

            /* =========================
               CREAR SESIÓN
            ========================== */
            localStorage.setItem(
                "nanysmart_usuario_actual",
                JSON.stringify(usuario)
            );
            localStorage.setItem(
                "alquismart_usuario_actual",
                JSON.stringify(usuario)
            );

            mensaje.textContent =
                data.mensaje || "Inicio de sesión correcto.";

            mensaje.className =
                "form-message success";

            /* =========================
               REDIRECCIÓN
            ========================== */
            setTimeout(() => {
                window.location.href =
                    "dashboard.html";
            }, 800);

        } catch (error) {
            mensaje.textContent = "No se pudo conectar con el backend (Spring Boot en http://localhost:8080). Asegúrate de que esté iniciado.";
            mensaje.className = "form-message error";
            console.error("Error al iniciar sesión:", error);
        }

    });

});