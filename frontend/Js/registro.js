/* ====== NANYSMART - REGISTRO ====== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registroForm");
    const mensaje = document.getElementById("registroMensaje");

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const nombre =
            document.getElementById("nombre").value.trim();

        const apellido =
            document.getElementById("apellido").value.trim();

        const dni =
            document.getElementById("dni").value.trim();

        const correo =
            document.getElementById("correo").value.trim();

        const telefono =
            document.getElementById("telefono").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        mensaje.textContent = "";
        mensaje.className = "form-message";

        /* =========================
           VALIDAR DNI
        ========================== */
        if (!/^\d{8}$/.test(dni)) {
            mostrarError("El DNI debe contener exactamente 8 números.");
            return;
        }

        /* =========================
           VALIDAR TELÉFONO
        ========================== */
        if (!/^\d{9}$/.test(telefono)) {
            mostrarError("El teléfono debe contener 9 números.");
            return;
        }

        /* =========================
           VALIDAR PASSWORD
        ========================== */
        if (password.length < 6) {
            mostrarError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            mostrarError("Las contraseñas no coinciden.");
            return;
        }

        /* =========================
           ENVIAR A SPRING BOOT / MYSQL
        ========================== */
        try {
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    dni,
                    correo,
                    telefono,
                    password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                mostrarError(data.error || "Error al crear la cuenta.");
                return;
            }

            // Guardar copia local para compatibilidad de vistas
            const usuarioGuardado = data.usuario || {
                id: Date.now(),
                nombre,
                apellido,
                dni,
                correo,
                telefono,
                roles: ["PROPIETARIO", "INQUILINO"]
            };
            if (!usuarioGuardado.roles) {
                usuarioGuardado.roles = ["PROPIETARIO", "INQUILINO"];
            }

            const usuarios = JSON.parse(
                localStorage.getItem("nanysmart_usuarios") ||
                localStorage.getItem("alquismart_usuarios")
            ) || [];
            usuarios.push(usuarioGuardado);
            localStorage.setItem("nanysmart_usuarios", JSON.stringify(usuarios));
            localStorage.setItem("alquismart_usuarios", JSON.stringify(usuarios));

            /* =========================
               ÉXITO
            ========================== */
            mensaje.textContent = data.mensaje || "Cuenta creada correctamente.";
            mensaje.className = "form-message success";

            form.reset();

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1200);

        } catch (error) {
            mostrarError("No se pudo conectar con el backend (Spring Boot en http://localhost:8080). Asegúrate de que esté iniciado.");
            console.error("Error al registrar:", error);
        }

    });

    function mostrarError(texto) {
        mensaje.textContent = texto;
        mensaje.className = "form-message error";
    }

});