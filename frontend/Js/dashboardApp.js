document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(
        localStorage.getItem('nanysmart_usuario_actual') ||
        localStorage.getItem('alquismart_usuario_actual')
    );
    const welcomeElement = document.getElementById('welcome');
    const userNameElement = document.getElementById('userName');
    const contratosCount = document.getElementById('contratosCount');
    const incidenciasCount = document.getElementById('incidenciasCount');
    const mediacionesCount = document.getElementById('mediacionesCount');
    const pagosCount = document.getElementById('pagosCount');
    const logoutButton = document.getElementById('logoutButton');

    if (!userData) {
        window.location.href = 'login.html';
        return;
    }

    const nombreCompleto = [userData.nombre, userData.apellido]
        .filter(Boolean)
        .join(' ')
        .trim();

    if (welcomeElement) {
        welcomeElement.textContent = nombreCompleto ? `Bienvenido, ${nombreCompleto}` : 'Bienvenido';
    }

    if (userNameElement) {
        userNameElement.textContent = nombreCompleto || 'Usuario';
    }

    const contratos = JSON.parse(localStorage.getItem('nanysmart_contratos') || localStorage.getItem('alquismart_contratos')) || [];
    const incidencias = JSON.parse(localStorage.getItem('nanysmart_incidencias') || localStorage.getItem('alquismart_incidencias')) || [];
    const mediaciones = JSON.parse(localStorage.getItem('nanysmart_mediaciones') || localStorage.getItem('alquismart_mediaciones')) || [];
    const pagos = JSON.parse(localStorage.getItem('nanysmart_pagos') || localStorage.getItem('alquismart_pagos')) || [];

    if (contratosCount) contratosCount.textContent = String(contratos.length || 0);
    if (incidenciasCount) incidenciasCount.textContent = String(incidencias.length || 0);
    if (mediacionesCount) mediacionesCount.textContent = String(mediaciones.length || 0);
    if (pagosCount) pagosCount.textContent = String(pagos.length || 0);

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('nanysmart_usuario_actual');
            localStorage.removeItem('alquismart_usuario_actual');
            window.location.href = 'login.html';
        });
    }
});
