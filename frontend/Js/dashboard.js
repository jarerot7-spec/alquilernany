/* =========================================
   NANYSMART - DASHBOARD
========================================= */

const simulationScenarioGroups = [
    {
        name: "Pagos y dinero",
        fields: ["amount", "days"],
        situations: [
            "Retraso en el pago del alquiler.",
            "Falta total de pago del alquiler.",
            "Pago parcial del alquiler.",
            "Propietario no reconoce un pago realizado.",
            "Pago enviado a una cuenta equivocada.",
            "Monto pagado diferente al establecido.",
            "Cambio del monto del alquiler sin acuerdo.",
            "Desacuerdo sobre una penalidad por retraso.",
            "Inquilino considera injustificada una penalidad.",
            "Desacuerdo sobre quién debe pagar un servicio.",
            "Deuda de servicios públicos.",
            "Propietario reclama una deuda que el inquilino afirma haber pagado.",
            "Comprobante de pago perdido o no verificable.",
            "Pago realizado después de una notificación de incumplimiento.",
            "Desacuerdo sobre la fecha límite de pago.",
            "Propietario no devuelve la garantía.",
            "Propietario descuenta dinero de la garantía por daños.",
            "Inquilino considera injustificado el descuento.",
            "Desacuerdo sobre cuánto debe devolverse de la garantía.",
            "Deudas pendientes al finalizar el contrato."
        ]
    },
    {
        name: "Estado y daños del inmueble",
        fields: ["amount"],
        situations: [
            "Fuga de agua.",
            "Rotura de una tubería.",
            "Inodoro malogrado.",
            "Ducha malograda.",
            "Lavadero malogrado.",
            "Humedad en una pared.",
            "Aparición de moho.",
            "Filtración proveniente de otro departamento.",
            "Ventana rota.",
            "Puerta dañada.",
            "Cerradura dañada.",
            "Pérdida de llaves.",
            "Piso dañado.",
            "Pared dañada.",
            "Pintura deteriorada.",
            "Mueble incluido en el alquiler dañado.",
            "Electrodoméstico incluido en el alquiler malogrado.",
            "Falla eléctrica.",
            "Corte de electricidad provocado por un problema del inmueble.",
            "Falla en la instalación de gas."
        ]
    },
    {
        name: "Reparaciones y mantenimiento",
        fields: ["amount", "days"],
        situations: [
            "Inquilino solicita una reparación y el propietario no responde.",
            "Propietario considera que una reparación no le corresponde.",
            "Inquilino considera que la reparación corresponde al propietario.",
            "Propietario considera que el inquilino causó el daño.",
            "Inquilino afirma que el daño ya existía antes de ocupar el inmueble.",
            "No existe evidencia del estado inicial del inmueble.",
            "Fotografías iniciales insuficientes para determinar el estado del inmueble.",
            "Reparación realizada de manera incompleta.",
            "Reparación que provoca un nuevo problema.",
            "Desacuerdo sobre quién debe contratar al técnico.",
            "Desacuerdo sobre el costo de una reparación.",
            "Técnico determina una causa diferente a la inicialmente planteada.",
            "Propietario demora demasiado en realizar una reparación.",
            "Inquilino realiza una reparación sin autorización.",
            "Inquilino modifica una instalación sin comunicarlo.",
            "Desacuerdo por el ingreso del propietario o técnico al inmueble.",
            "Reparación que requiere atención urgente.",
            "No se puede determinar quién debe asumir una reparación.",
            "Inquilino impide el acceso necesario para realizar una reparación.",
            "Propietario no puede coordinar oportunamente la reparación."
        ]
    },
    {
        name: "Uso del inmueble",
        fields: [],
        situations: [
            "Inquilino utiliza el inmueble para una actividad no contemplada.",
            "Inquilino realiza modificaciones sin autorización.",
            "Inquilino pinta el inmueble sin autorización.",
            "Instalación de elementos que modifican la propiedad.",
            "Habitación utilizada para un propósito diferente al acordado.",
            "Se supera el número de ocupantes acordado.",
            "Una persona adicional comienza a vivir en el inmueble.",
            "Subarrendamiento sin autorización.",
            "Otra persona utiliza el inmueble sin autorización.",
            "Actividad comercial realizada en un inmueble destinado a vivienda."
        ]
    },
    {
        name: "Convivencia",
        fields: [],
        situations: [
            "Quejas de vecinos por ruido.",
            "Reuniones que generan molestias.",
            "Conflicto entre inquilino y vecinos.",
            "Propietario recibe una queja sobre el comportamiento del inquilino.",
            "Inquilino considera injustificadas las quejas.",
            "Incumplimiento de reglas de convivencia del edificio.",
            "Conflicto por el uso de áreas comunes.",
            "Problema relacionado con el estacionamiento.",
            "Uso indebido de un espacio común.",
            "Diferente interpretación de las reglas de convivencia."
        ]
    },
    {
        name: "Mascotas",
        fields: ["amount"],
        situations: [
            "Inquilino introduce una mascota no contemplada en el acuerdo.",
            "Mascota causa daños al inmueble.",
            "Mascota genera molestias a los vecinos.",
            "Desacuerdo sobre quién debe pagar daños causados por una mascota.",
            "Propietario descubre una mascota que no había sido comunicada."
        ]
    },
    {
        name: "Contrato",
        fields: ["amount", "days"],
        situations: [
            "Una parte quiere modificar una condición del contrato.",
            "Inquilino quiere terminar anticipadamente el contrato.",
            "Propietario quiere terminar anticipadamente el contrato.",
            "Una parte quiere renovar el contrato.",
            "Desacuerdo sobre las condiciones de renovación.",
            "Una parte no quiere renovar.",
            "Desacuerdo sobre la fecha exacta de finalización.",
            "Una parte interpreta una cláusula de manera diferente.",
            "Una condición importante quedó fuera del contrato.",
            "Una cláusula del contrato resulta ambigua."
        ]
    },
    {
        name: "Situaciones especiales",
        fields: ["amount", "days"],
        situations: [
            "El inmueble queda temporalmente inhabitable.",
            "Inundación, incendio u otro evento grave afecta el inmueble.",
            "Una de las partes deja de responder las comunicaciones.",
            "Una parte afirma que la otra incumplió un compromiso.",
            "Desacuerdo sobre el estado final del inmueble y las obligaciones pendientes."
        ]
    }
];

document.addEventListener("DOMContentLoaded", () => {

    const usuarioGuardado =
        localStorage.getItem("nanysmart_usuario_actual") ||
        localStorage.getItem("alquismart_usuario_actual");


    /* =========================
       VERIFICAR SESIÓN
    ========================== */

    if (!usuarioGuardado) {

        window.location.href =
            "login.html";

        return;
    }


    const usuario =
        JSON.parse(usuarioGuardado);


    /* =========================
       MOSTRAR USUARIO
    ========================== */

    const welcome =
        document.getElementById("welcome");


    welcome.textContent =
        `Bienvenido, ${usuario.nombre}`;

    const dashboardTabs = document.querySelectorAll("[data-dashboard-tab]");
    const dashboardViews = document.querySelectorAll("[data-dashboard-view]");

    function activateDashboardTab(tabName, scrollTarget = "") {
        dashboardViews.forEach(view => {
            view.hidden = view.dataset.dashboardView !== tabName;
        });

        dashboardTabs.forEach(tab => {
            const isCurrentTab = tab.dataset.dashboardTab === tabName && !tab.dataset.scrollTarget;
            tab.classList.toggle("active", isCurrentTab);
            if (isCurrentTab) {
                tab.setAttribute("aria-current", "page");
            } else {
                tab.removeAttribute("aria-current");
            }
        });

        const hash = scrollTarget || tabName;
        if (window.location.hash !== `#${hash}`) {
            history.replaceState(null, "", `#${hash}`);
        }

        if (scrollTarget) {
            document.getElementById(scrollTarget).scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    dashboardTabs.forEach(tab => {
        tab.addEventListener("click", event => {
            event.preventDefault();
            activateDashboardTab(tab.dataset.dashboardTab, tab.dataset.scrollTarget || "");
        });
    });

    const initialHash = window.location.hash.slice(1);
    const initialTab = ["contrato", "ofertas", "solicitudes", "simulacion", "escenarios"].includes(initialHash) ? initialHash : "inicio";
    activateDashboardTab(initialTab);

    const ownerId = String(usuario.id || usuario.correo).toLowerCase();
    const propertyForm = document.getElementById("propertyForm");
    const propertyMessage = document.getElementById("propertyMessage");
    const myRentalGrid = document.getElementById("myRentalGrid");
    const myOfferCount = document.getElementById("myOfferCount");
    const userOfferCount = document.getElementById("userOfferCount");
    const offersTabMyGrid = document.getElementById("offersTabMyGrid");
    const offersTabMyCount = document.getElementById("offersTabMyCount");
    const otherRentalGrid = document.getElementById("otherRentalGrid");
    const otherOfferCount = document.getElementById("otherOfferCount");
    const receivedRequestGrid = document.getElementById("receivedRequestGrid");
    const receivedRequestCount = document.getElementById("receivedRequestCount");
    const sentRequestGrid = document.getElementById("sentRequestGrid");
    const sentRequestCount = document.getElementById("sentRequestCount");
    const requestCount = document.getElementById("requestCount");
    const simulationCount = document.getElementById("simulationCount");
    const simulationGate = document.getElementById("simulationGate");
    const simulationWorkspace = document.getElementById("simulationWorkspace");
    const simulationAgreementSelect = document.getElementById("acceptedAgreementSelect");
    const scenarioGate = document.getElementById("scenarioGate");
    const scenarioWorkspace = document.getElementById("scenarioWorkspace");
    const scenarioAgreementSelect = document.getElementById("scenarioAgreementSelect");
    const scenarioAgreementSummary = document.getElementById("scenarioAgreementSummary");
    const scenarioConditionsSummary = document.getElementById("scenarioConditionsSummary");
    const scenarioConditionsDetails = document.getElementById("scenarioConditionsDetails");
    const scenarioConditionsPrompt = document.getElementById("scenarioConditionsPrompt");
    const scenarioWaiting = document.getElementById("scenarioWaiting");
    const simulationAgreementSummary = document.getElementById("simulationAgreementSummary");
    const simulationConditionsForm = document.getElementById("simulationConditionsForm");
    const simulationConditionsMessage = document.getElementById("simulationConditionsMessage");
    const simulationConditionsSummary = document.getElementById("simulationConditionsSummary");
    const simulationConditionsDetails = document.getElementById("simulationConditionsDetails");
    const simulationWaiting = document.getElementById("simulationWaiting");
    const simulationCases = document.getElementById("simulationCases");
    const simulationQuickCases = document.getElementById("simulationQuickCases");
    const simulationCategory = document.getElementById("simulationCategory");
    const simulationScenario = document.getElementById("simulationScenario");
    const simulationAmountField = document.getElementById("simulationAmountField");
    const simulationAmountLabel = document.getElementById("simulationAmountLabel");
    const simulationDaysField = document.getElementById("simulationDaysField");
    const simulationDaysLabel = document.getElementById("simulationDaysLabel");
    const simulationScenarioForm = document.getElementById("simulationScenarioForm");
    const simulationScenarioResult = document.getElementById("simulationScenarioResult");
    const simulationOwnerStatus = document.getElementById("simulationOwnerStatus");
    const simulationOwnerStatusBadge = document.getElementById("simulationOwnerStatusBadge");
    const simulationOwnerStatusText = document.getElementById("simulationOwnerStatusText");
    const simulationResponsePanel = document.getElementById("simulationResponsePanel");
    const simulationResponseStatus = document.getElementById("simulationResponseStatus");
    const simulationResponseBadge = document.getElementById("simulationResponseBadge");
    const simulationResponseText = document.getElementById("simulationResponseText");
    const simulationRejectReason = document.getElementById("simulationRejectReason");
    const simulationRejectButton = document.getElementById("simulationRejectButton");
    const simulationResponseMessage = document.getElementById("simulationResponseMessage");
    const acceptanceDialog = document.getElementById("acceptanceDialog");
    const acceptanceRequestForm = document.getElementById("acceptanceRequestForm");
    const requestFormMessage = document.getElementById("requestFormMessage");
    const contactPhone = document.getElementById("contactPhone");
    let selectedOffer = null;
    let selectedSimulationAgreementId = "";

    if (contactPhone && usuario.telefono) {
        contactPhone.value = usuario.telefono;
    }

    renderUserOffers();
    renderOtherOffers();
    renderReceivedRequests();
    renderSentRequests();
    renderSimulationTab();
    syncOffersFromBackend();
    syncRequestsFromBackend();
    syncSimulationsFromBackend();

    document.getElementById("closeRequestDialog").addEventListener("click", closeRequestDialog);
    document.getElementById("cancelRequestDialog").addEventListener("click", closeRequestDialog);
    simulationAgreementSelect.addEventListener("change", event => syncAcceptedAgreement(event.target.value));
    scenarioAgreementSelect.addEventListener("change", event => syncAcceptedAgreement(event.target.value));
    simulationCategory.addEventListener("change", populateSimulationScenarios);
    simulationScenario.addEventListener("change", updateSimulationInputs);

    simulationConditionsForm.addEventListener("submit", async event => {
        event.preventDefault();
        const agreement = getSelectedAcceptedAgreement();
        if (!agreement || agreement.propietarioId !== ownerId) return;

        const formData = new FormData(simulationConditionsForm);
        const simulations = readSimulations();
        const simulation = getSimulationRecord(simulations, agreement.id) || {
            solicitudId: String(agreement.id),
            propietarioId: agreement.propietarioId,
            inquilinoId: agreement.solicitanteId,
            resultados: {}
        };

        simulation.propietarioId = agreement.propietarioId;
        simulation.inquilinoId = agreement.solicitanteId;
        simulation.tituloOferta = agreement.tituloOferta;
        simulation.condiciones = {
            montoGarantia: Number(formData.get("montoGarantia")),
            diasGracia: Number(formData.get("diasGracia")),
            recargoDiario: Number(formData.get("recargoDiario")),
            limiteReparacion: Number(formData.get("limiteReparacion")),
            diasAviso: Number(formData.get("diasAviso")),
            penalidadSalida: Number(formData.get("penalidadSalida")),
            plazoRespuesta: Number(formData.get("plazoRespuesta")),
            viaResolucion: formData.get("viaResolucion")
        };
        simulation.resultados = {};
        // Al redefinir condiciones se reinicia la negociación con el inquilino
        simulation.estado = "PENDIENTE";
        simulation.motivoRechazo = null;
        simulation.fechaRespuesta = null;
        simulation.actualizadoEn = new Date().toISOString();
        saveSimulation(simulations, simulation);

        // Compartir las condiciones con el inquilino a través del backend
        await pushSimulationToBackend(simulation);

        simulationConditionsMessage.textContent = "Condiciones guardadas. Ya pueden simular los escenarios.";
        simulationConditionsMessage.className = "property-message success";
        renderSelectedSimulation();
    });

    simulationScenarioForm.addEventListener("submit", event => {
        event.preventDefault();
        simulateScenario();
    });

    document.querySelectorAll(".simulation-case-form").forEach(form => {
        form.addEventListener("submit", event => {
            event.preventDefault();
            simulateQuickScenario(form);
        });
    });

    // El inquilino rechaza las condiciones definidas por el propietario
    simulationRejectButton.addEventListener("click", async () => {
        const agreement = getSelectedAcceptedAgreement();
        if (!agreement || agreement.propietarioId === ownerId) return;

        const simulations = readSimulations();
        const simulation = getSimulationRecord(simulations, agreement.id);
        if (!simulation?.condiciones) return;

        const motivo = simulationRejectReason.value.trim();

        simulation.estado = "RECHAZADA";
        simulation.motivoRechazo = motivo || "El inquilino rechazó las condiciones.";
        simulation.fechaRespuesta = new Date().toISOString();
        saveSimulation(simulations, simulation);

        // Registrar el rechazo en el backend para que lo vea el propietario
        try {
            await fetch(`http://localhost:8080/api/simulaciones/solicitud/${simulation.solicitudId}/respuesta`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ estado: "RECHAZADA", motivoRechazo: simulation.motivoRechazo })
            });
        } catch (e) {
            console.warn("No se pudo registrar el rechazo en el backend:", e);
        }

        simulationResponseMessage.textContent = "Rechazaste las condiciones. Se lo comunicamos al propietario.";
        simulationResponseMessage.className = "property-message error";
        renderSelectedSimulation();
    });

    function isMyOffer(offer) {
        if (!offer) return false;
        const offerOwner = String(offer.propietarioId || "").trim().toLowerCase();
        const offerCorreo = String(offer.propietarioCorreo || "").trim().toLowerCase();
        const currentOwner = String(ownerId || "").trim().toLowerCase();
        const currentCorreo = String(usuario.correo || "").trim().toLowerCase();
        const currentId = String(usuario.id || "").trim().toLowerCase();

        return (offerOwner !== "" && (offerOwner === currentOwner || offerOwner === currentId || offerOwner === currentCorreo)) ||
               (offerCorreo !== "" && (offerCorreo === currentCorreo || offerCorreo === currentOwner));
    }

    function isReceivedRequest(request) {
        if (!request) return false;
        const reqOwner = String(request.propietarioId || "").trim().toLowerCase();
        const reqCorreo = String(request.propietarioCorreo || "").trim().toLowerCase();
        const currentOwner = String(ownerId || "").trim().toLowerCase();
        const currentCorreo = String(usuario.correo || "").trim().toLowerCase();
        const currentId = String(usuario.id || "").trim().toLowerCase();

        return (reqOwner !== "" && (reqOwner === currentOwner || reqOwner === currentId || reqOwner === currentCorreo)) ||
               (reqCorreo !== "" && (reqCorreo === currentCorreo || reqCorreo === currentOwner));
    }

    function isSentRequest(request) {
        if (!request) return false;
        const reqApplicant = String(request.solicitanteId || "").trim().toLowerCase();
        const reqCorreo = String(request.solicitanteCorreo || "").trim().toLowerCase();
        const currentOwner = String(ownerId || "").trim().toLowerCase();
        const currentCorreo = String(usuario.correo || "").trim().toLowerCase();
        const currentId = String(usuario.id || "").trim().toLowerCase();

        return (reqApplicant !== "" && (reqApplicant === currentOwner || reqApplicant === currentId || reqApplicant === currentCorreo)) ||
               (reqCorreo !== "" && (reqCorreo === currentCorreo || reqCorreo === currentOwner));
    }

    acceptanceRequestForm.addEventListener("submit", async event => {
        event.preventDefault();
        if (!selectedOffer) return;

        if (getAcceptedRequestFor(ownerId)) {
            requestFormMessage.textContent = "Ya tienes una solicitud aceptada y no puedes enviar otra.";
            requestFormMessage.className = "property-message error";
            return;
        }

        const existingRequest = getApplicantRequest(selectedOffer);
        if (existingRequest && existingRequest.estado !== "RECHAZADA") {
            requestFormMessage.textContent = "Ya tienes una solicitud para esta vivienda.";
            requestFormMessage.className = "property-message error";
            return;
        }

        const formData = new FormData(acceptanceRequestForm);
        const nombreSolicitante = [usuario.nombre, usuario.apellido].filter(Boolean).join(" ").trim();
        const request = {
            id: Date.now(),
            clientRequestId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            ofertaId: String(selectedOffer.id),
            propietarioId: String(selectedOffer.propietarioId || ""),
            propietarioCorreo: String(selectedOffer.propietarioCorreo || ""),
            solicitanteId: String(usuario.id || ownerId),
            solicitanteNombre: nombreSolicitante || "Usuario",
            solicitanteCorreo: String(usuario.correo || "").trim().toLowerCase(),
            solicitanteTelefono: usuario.telefono || "",
            tituloOferta: selectedOffer.titulo,
            precioPublicado: Number(selectedOffer.precio),
            precioPropuesto: Number(formData.get("precioPropuesto")),
            garantiaPropuesta: Number(formData.get("garantiaPropuesta")) || 0,
            fechaIngreso: formData.get("fechaIngreso"),
            mensaje: formData.get("mensaje").trim(),
            estado: "PENDIENTE",
            fechaSolicitud: new Date().toISOString()
        };

        // Guardar solicitud en la base de datos MySQL (Backend Spring Boot)
        try {
            const res = await fetch("http://localhost:8080/api/solicitudes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request)
            });
            if (res.ok) {
                const saved = await res.json();
                if (saved && saved.id) {
                    request.id = saved.id;
                }
            }
        } catch (e) {
            console.warn("No se pudo conectar con el backend de solicitudes, guardando localmente:", e);
        }

        try {
            const requests = readRequests();
            requests.push(request);
            localStorage.setItem("nanysmart_solicitudes", JSON.stringify(requests));
            localStorage.setItem("alquismart_solicitudes", JSON.stringify(requests));
            requestFormMessage.textContent = "Solicitud enviada exitosamente. El propietario podrá revisarla.";
            requestFormMessage.className = "property-message success";
            acceptanceRequestForm.querySelector("[type=submit]").disabled = true;
            renderOtherOffers();
            renderReceivedRequests();
            renderSentRequests();
        } catch {
            requestFormMessage.textContent = "No se pudo guardar la solicitud.";
            requestFormMessage.className = "property-message error";
        }
    });

    propertyForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        propertyMessage.textContent = "";
        propertyMessage.className = "property-message";

        const photoFile = document.getElementById("propertyPhoto").files[0];

        try {
            const photo = photoFile ? await resizePhoto(photoFile) : "";
            const formData = new FormData(propertyForm);
            const offer = {
                id: Date.now(),
                propietarioId: String(usuario.id || ownerId),
                propietarioCorreo: String(usuario.correo || "").trim().toLowerCase(),
                tipo: formData.get("tipo"),
                titulo: formData.get("titulo").trim(),
                ubicacion: formData.get("ubicacion").trim(),
                direccion: formData.get("direccion").trim(),
                descripcion: formData.get("descripcion").trim(),
                precio: Number(formData.get("precio")),
                garantia: Number(formData.get("garantia")) || 0,
                mantenimiento: Number(formData.get("mantenimiento")) || 0,
                dormitorios: Number(formData.get("dormitorios")),
                banos: Number(formData.get("banos")),
                area: Number(formData.get("area")),
                telefono: formData.get("telefono").trim(),
                foto: photo,
                fechaPublicacion: new Date().toISOString()
            };

            // Guardar en la base de datos MySQL (Backend Spring Boot)
            try {
                const res = await fetch("http://localhost:8080/api/ofertas", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(offer)
                });
                if (res.ok) {
                    const savedOffer = await res.json();
                    if (savedOffer && savedOffer.id) {
                        offer.id = savedOffer.id;
                    }
                }
            } catch (err) {
                console.warn("No se pudo conectar con el backend de ofertas, guardando localmente:", err);
            }

            const offers = readOffers();
            offers.push(offer);
            localStorage.setItem("nanysmart_ofertas", JSON.stringify(offers));
            localStorage.setItem("alquismart_ofertas", JSON.stringify(offers));

            propertyForm.reset();
            if (contactPhone && usuario.telefono) {
                contactPhone.value = usuario.telefono;
            }
            propertyMessage.textContent = "Tu oferta quedó guardada exitosamente.";
            propertyMessage.classList.add("success");
            renderUserOffers();
            renderOtherOffers();
        } catch (error) {
            propertyMessage.textContent = error.message || "No se pudo guardar la oferta.";
            propertyMessage.classList.add("error");
        }
    });

    async function syncOffersFromBackend() {
        try {
            const res = await fetch("http://localhost:8080/api/ofertas");
            if (res.ok) {
                const dbOffers = await res.json();
                if (Array.isArray(dbOffers) && dbOffers.length > 0) {
                    localStorage.setItem("nanysmart_ofertas", JSON.stringify(dbOffers));
                    localStorage.setItem("alquismart_ofertas", JSON.stringify(dbOffers));
                    renderUserOffers();
                    renderOtherOffers();
                }
            }
        } catch {
            // Continuar con localStorage si el backend no responde
        }
    }

    async function syncRequestsFromBackend() {
        try {
            const res = await fetch("http://localhost:8080/api/solicitudes");
            if (res.ok) {
                const dbRequests = await res.json();
                if (Array.isArray(dbRequests)) {
                    localStorage.setItem("nanysmart_solicitudes", JSON.stringify(dbRequests));
                    localStorage.setItem("alquismart_solicitudes", JSON.stringify(dbRequests));
                    renderReceivedRequests();
                    renderSentRequests();
                    renderOtherOffers();
                }
            }
        } catch {
            // Continuar con localStorage si el backend no responde
        }
    }

    function readOffers() {
        try {
            const offers = JSON.parse(
                localStorage.getItem("nanysmart_ofertas") ||
                localStorage.getItem("alquismart_ofertas")
            ) || [];
            return Array.isArray(offers) ? offers : [];
        } catch {
            return [];
        }
    }

    function renderUserOffers() {
        const userOffers = readOffers().filter(offer => isMyOffer(offer));
        myRentalGrid.replaceChildren();
        offersTabMyGrid.replaceChildren();
        myOfferCount.textContent = `${userOffers.length} ${userOffers.length === 1 ? "publicación" : "publicaciones"}`;
        offersTabMyCount.textContent = `${userOffers.length} ${userOffers.length === 1 ? "publicación" : "publicaciones"}`;
        userOfferCount.textContent = String(userOffers.length);

        if (userOffers.length === 0) {
            const emptyState = document.createElement("p");
            emptyState.className = "empty-offers";
            emptyState.textContent = "Todavía no publicaste una vivienda.";
            myRentalGrid.append(emptyState);
            offersTabMyGrid.append(emptyState.cloneNode(true));
            return;
        }

        userOffers.forEach(offer => {
            myRentalGrid.append(createOfferCard(offer));
            offersTabMyGrid.append(createOfferCard(offer));
        });
    }

    function renderOtherOffers() {
        const offers = readOffers().filter(offer => !isMyOffer(offer));
        otherRentalGrid.replaceChildren();
        otherOfferCount.textContent = `${offers.length} ${offers.length === 1 ? "publicación" : "publicaciones"}`;

        if (offers.length === 0) {
            const emptyState = document.createElement("p");
            emptyState.className = "empty-offers";
            emptyState.textContent = "Las ofertas de otras cuentas aparecerán aquí.";
            otherRentalGrid.append(emptyState);
            return;
        }

        offers
            .slice()
            .sort((first, second) => new Date(second.fechaPublicacion) - new Date(first.fechaPublicacion))
            .forEach(offer => otherRentalGrid.append(createOfferCard(offer)));
    }

    function readRequests() {
        try {
            const requests = JSON.parse(
                localStorage.getItem("nanysmart_solicitudes") ||
                localStorage.getItem("alquismart_solicitudes")
            ) || [];
            return Array.isArray(requests) ? requests : [];
        } catch {
            return [];
        }
    }

    function getApplicantRequest(offer) {
        return readRequests()
            .filter(request => String(request.ofertaId) === String(offer.id) && isSentRequest(request))
            .sort((first, second) => new Date(second.fechaSolicitud) - new Date(first.fechaSolicitud))[0] || null;
    }

    function getAcceptedRequestFor(applicantId) {
        const target = String(applicantId || "").trim().toLowerCase();
        return readRequests().find(request => {
            const reqApp = String(request.solicitanteId || "").trim().toLowerCase();
            const reqCorreo = String(request.solicitanteCorreo || "").trim().toLowerCase();
            return (reqApp === target || reqCorreo === target) && request.estado === "ACEPTADA";
        }) || null;
    }

    function getRequestStatusLabel(status) {
        const labels = {
            PENDIENTE: "Pendiente",
            ACEPTADA: "Aceptada",
            RECHAZADA: "Rechazada",
            CANCELADA: "Cancelada: se aceptó otra vivienda"
        };
        return labels[status] || status;
    }

    function openAcceptanceDialog(offer) {
        if (getAcceptedRequestFor(ownerId)) return;

        selectedOffer = offer;
        acceptanceRequestForm.reset();
        acceptanceRequestForm.querySelector("[type=submit]").disabled = false;
        requestFormMessage.textContent = "";
        requestFormMessage.className = "property-message";
        document.getElementById("requestOfferSummary").textContent = `${offer.titulo} · precio publicado: ${formatPrice(offer.precio)} / mes`;
        document.getElementById("proposedPrice").value = offer.precio;
        document.getElementById("proposedDeposit").value = offer.garantia || 0;
        acceptanceDialog.showModal();
    }

    function closeRequestDialog() {
        if (acceptanceDialog.open) acceptanceDialog.close();
        selectedOffer = null;
    }

    function renderReceivedRequests() {
        const requests = readRequests()
            .filter(request => isReceivedRequest(request))
            .sort((first, second) => new Date(second.fechaSolicitud) - new Date(first.fechaSolicitud));

        receivedRequestGrid.replaceChildren();
        receivedRequestCount.textContent = `${requests.length} ${requests.length === 1 ? "solicitud" : "solicitudes"}`;
        updateRequestCount();

        if (requests.length === 0) {
            const emptyState = document.createElement("p");
            emptyState.className = "empty-offers";
            emptyState.textContent = "Cuando alguien solicite una vivienda tuya, aparecerá aquí.";
            receivedRequestGrid.append(emptyState);
            return;
        }

        requests.forEach(request => {
            const card = document.createElement("article");
            card.className = "request-card";

            const heading = document.createElement("div");
            heading.className = "request-card-heading";
            const title = document.createElement("h4");
            title.textContent = request.tituloOferta;
            const status = document.createElement("span");
            status.className = `request-status ${request.estado.toLowerCase()}`;
            status.textContent = getRequestStatusLabel(request.estado);
            heading.append(title, status);

            const applicant = document.createElement("p");
            applicant.className = "request-applicant";
            applicant.textContent = `${request.solicitanteNombre} · ${request.solicitanteCorreo}${request.solicitanteTelefono ? ` · ${request.solicitanteTelefono}` : ""}`;

            const price = document.createElement("p");
            price.className = "request-terms";
            price.textContent = `Precio propuesto: ${formatPrice(request.precioPropuesto)} / mes (publicado: ${formatPrice(request.precioPublicado)} / mes)`;

            const terms = document.createElement("p");
            terms.className = "request-terms";
            const details = [`Garantía propuesta: ${formatPrice(request.garantiaPropuesta)}`];
            if (request.fechaIngreso) details.push(`Ingreso: ${formatDate(request.fechaIngreso)}`);
            terms.textContent = details.join(" · ");

            const message = document.createElement("p");
            message.className = "request-message-text";
            message.textContent = request.mensaje || "Sin mensaje adicional.";

            card.append(heading, applicant, price, terms, message);

            if (request.estado === "PENDIENTE") {
                const actions = document.createElement("div");
                actions.className = "request-actions";
                actions.append(
                    createRequestAction("Aceptar", "accept", () => updateRequestStatus(request.id, "ACEPTADA")),
                    createRequestAction("Rechazar", "reject", () => updateRequestStatus(request.id, "RECHAZADA"))
                );
                card.append(actions);
            }

            receivedRequestGrid.append(card);
        });
    }

    function renderSentRequests() {
        const requests = readRequests()
            .filter(request => isSentRequest(request))
            .sort((first, second) => new Date(second.fechaSolicitud) - new Date(first.fechaSolicitud));

        sentRequestGrid.replaceChildren();
        sentRequestCount.textContent = `${requests.length} ${requests.length === 1 ? "solicitud" : "solicitudes"}`;
        updateRequestCount();

        if (requests.length === 0) {
            const emptyState = document.createElement("p");
            emptyState.className = "empty-offers";
            emptyState.textContent = "Las solicitudes que envíes a otras viviendas aparecerán aquí.";
            sentRequestGrid.append(emptyState);
            return;
        }

        requests.forEach(request => {
            const card = document.createElement("article");
            card.className = "request-card";

            const heading = document.createElement("div");
            heading.className = "request-card-heading";
            const title = document.createElement("h4");
            title.textContent = request.tituloOferta;
            const status = document.createElement("span");
            status.className = `request-status ${request.estado.toLowerCase()}`;
            status.textContent = getRequestStatusLabel(request.estado);
            heading.append(title, status);

            const price = document.createElement("p");
            price.className = "request-terms";
            price.textContent = `Tu propuesta: ${formatPrice(request.precioPropuesto)} / mes · publicado: ${formatPrice(request.precioPublicado)} / mes`;

            const terms = document.createElement("p");
            terms.className = "request-terms";
            const details = [`Garantía propuesta: ${formatPrice(request.garantiaPropuesta)}`];
            if (request.fechaIngreso) details.push(`Ingreso: ${formatDate(request.fechaIngreso)}`);
            terms.textContent = details.join(" · ");

            const message = document.createElement("p");
            message.className = "request-message-text";
            message.textContent = request.mensaje || "Sin mensaje adicional.";

            card.append(heading, price, terms, message);
            sentRequestGrid.append(card);
        });
    }

    function updateRequestCount() {
        const pendingCount = readRequests().filter(request =>
            request.estado === "PENDIENTE" &&
            (isReceivedRequest(request) || isSentRequest(request))
        ).length;
        requestCount.textContent = String(pendingCount);
    }

    function createRequestAction(label, action, callback) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `request-action-button ${action}`;
        button.textContent = label;
        button.addEventListener("click", callback);
        return button;
    }

    async function updateRequestStatus(requestId, status) {
        const requests = readRequests();
        const request = requests.find(item => (String(item.id) === String(requestId) || String(item.clientRequestId) === String(requestId)) && isReceivedRequest(item));
        if (!request || request.estado !== "PENDIENTE") return;

        const responseDate = new Date().toISOString();
        const otherAcceptedRequest = status === "ACEPTADA" && requests.find(item =>
            item.id !== request.id &&
            item.solicitanteId === request.solicitanteId &&
            item.estado === "ACEPTADA"
        );

        if (otherAcceptedRequest) {
            request.estado = "CANCELADA";
            request.motivoCancelacion = "La persona ya aceptó otra vivienda.";
        } else {
            request.estado = status;
            if (status === "ACEPTADA") {
                requests.forEach(item => {
                    if (item.id !== request.id && item.solicitanteId === request.solicitanteId && item.estado === "PENDIENTE") {
                        item.estado = "CANCELADA";
                        item.motivoCancelacion = "La persona aceptó otra vivienda.";
                        item.fechaRespuesta = responseDate;
                    }
                });
            }
        }

        request.fechaRespuesta = responseDate;
        localStorage.setItem("nanysmart_solicitudes", JSON.stringify(requests));
        localStorage.setItem("alquismart_solicitudes", JSON.stringify(requests));

        // Actualizar en la base de datos MySQL (Backend Spring Boot)
        try {
            await fetch(`http://localhost:8080/api/solicitudes/${request.id}/estado`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ estado: status })
            });
        } catch (e) {
            console.warn("No se pudo actualizar estado en el backend:", e);
        }

        renderReceivedRequests();
        renderSentRequests();
        renderOtherOffers();
        renderSimulationTab();
    }

    function formatDate(dateValue) {
        return new Intl.DateTimeFormat("es-PE", {
            dateStyle: "medium",
            timeZone: "UTC"
        }).format(new Date(`${dateValue}T00:00:00Z`));
    }

    function readSimulations() {
        try {
            const simulations = JSON.parse(
                localStorage.getItem("nanysmart_simulaciones") ||
                localStorage.getItem("alquismart_simulaciones")
            ) || [];
            return Array.isArray(simulations) ? simulations : [];
        } catch {
            return [];
        }
    }

    function readAcceptedAgreements() {
        return readRequests().filter(request =>
            request.estado === "ACEPTADA" &&
            (request.propietarioId === ownerId || request.solicitanteId === ownerId)
        );
    }

    function getSimulationRecord(simulations, agreementId) {
        return simulations.find(simulation => String(simulation.solicitudId) === String(agreementId));
    }

    function saveSimulation(simulations, simulation) {
        const existingIndex = simulations.findIndex(item => String(item.solicitudId) === String(simulation.solicitudId));
        if (existingIndex === -1) {
            simulations.push(simulation);
        } else {
            simulations[existingIndex] = simulation;
        }
        localStorage.setItem("nanysmart_simulaciones", JSON.stringify(simulations));
        localStorage.setItem("alquismart_simulaciones", JSON.stringify(simulations));
    }

    /* Convierte una simulación del backend (campos planos) al formato local (condiciones anidadas). */
    function mapBackendSimulation(db) {
        const conditions = {
            montoGarantia: db.montoGarantia,
            diasGracia: db.diasGracia,
            recargoDiario: db.recargoDiario,
            limiteReparacion: db.limiteReparacion,
            diasAviso: db.diasAviso,
            penalidadSalida: db.penalidadSalida,
            plazoRespuesta: db.plazoRespuesta,
            viaResolucion: db.viaResolucion
        };
        return {
            solicitudId: String(db.solicitudId),
            propietarioId: db.propietarioId,
            inquilinoId: db.inquilinoId,
            tituloOferta: db.tituloOferta,
            condiciones: conditions,
            estado: db.estado,
            motivoRechazo: db.motivoRechazo,
            fechaRespuesta: db.fechaRespuesta,
            resultados: {}
        };
    }

    /* El propietario comparte las condiciones con el inquilino (backend). */
    async function pushSimulationToBackend(simulation) {
        if (!simulation?.condiciones) return;
        const c = simulation.condiciones;
        const payload = {
            solicitudId: String(simulation.solicitudId),
            propietarioId: simulation.propietarioId,
            inquilinoId: simulation.inquilinoId,
            tituloOferta: simulation.tituloOferta,
            montoGarantia: Number(c.montoGarantia),
            diasGracia: Number(c.diasGracia),
            recargoDiario: Number(c.recargoDiario),
            limiteReparacion: Number(c.limiteReparacion),
            diasAviso: Number(c.diasAviso),
            penalidadSalida: Number(c.penalidadSalida),
            plazoRespuesta: Number(c.plazoRespuesta),
            viaResolucion: c.viaResolucion
        };
        try {
            await fetch("http://localhost:8080/api/simulaciones", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        } catch (e) {
            console.warn("No se pudo guardar la simulación en el backend:", e);
        }
    }

    /* Trae las simulaciones del backend y las fusiona con las locales (preservando resultados ya calculados). */
    async function syncSimulationsFromBackend() {
        try {
            const res = await fetch("http://localhost:8080/api/simulaciones");
            if (!res.ok) return;
            const dbSimulations = await res.json();
            if (!Array.isArray(dbSimulations) || dbSimulations.length === 0) return;

            const simulations = readSimulations();
            dbSimulations.forEach(db => {
                const idx = simulations.findIndex(item => String(item.solicitudId) === String(db.solicitudId));
                const mapped = mapBackendSimulation(db);
                if (idx === -1) {
                    simulations.push(mapped);
                } else {
                    // Conservar los resultados de simulación ya calculados en este navegador
                    mapped.resultados = simulations[idx].resultados || {};
                    mapped.costoReparacionSimulado = simulations[idx].costoReparacionSimulado;
                    simulations[idx] = mapped;
                }
            });
            localStorage.setItem("nanysmart_simulaciones", JSON.stringify(simulations));
            localStorage.setItem("alquismart_simulaciones", JSON.stringify(simulations));
            renderSimulationTab();
        } catch {
            // Continuar con localStorage si el backend no responde
        }
    }

    function renderSimulationTab() {
        if (simulationCategory.options.length === 0) populateSimulationCategories();

        const agreements = readAcceptedAgreements();
        simulationCount.textContent = String(agreements.length);
        simulationGate.hidden = agreements.length > 0;
        simulationWorkspace.hidden = agreements.length === 0;
        scenarioGate.hidden = agreements.length > 0;
        scenarioWorkspace.hidden = agreements.length === 0;

        if (agreements.length === 0) {
            simulationAgreementSelect.replaceChildren();
            scenarioAgreementSelect.replaceChildren();
            selectedSimulationAgreementId = "";
            return;
        }

        const previousSelection = selectedSimulationAgreementId || simulationAgreementSelect.value || scenarioAgreementSelect.value;
        simulationAgreementSelect.replaceChildren();
        scenarioAgreementSelect.replaceChildren();

        agreements.forEach(agreement => {
            const counterpart = agreement.propietarioId === ownerId
                ? `Inquilino: ${agreement.solicitanteNombre}`
                : "Acuerdo aceptado";
            [simulationAgreementSelect, scenarioAgreementSelect].forEach(select => {
                const option = document.createElement("option");
                option.value = String(agreement.id);
                option.textContent = `${agreement.tituloOferta} · ${counterpart}`;
                select.append(option);
            });
        });

        selectedSimulationAgreementId = agreements.some(item => String(item.id) === previousSelection)
            ? previousSelection
            : String(agreements[0].id);
        simulationAgreementSelect.value = selectedSimulationAgreementId;
        scenarioAgreementSelect.value = selectedSimulationAgreementId;
        renderSelectedSimulation();
    }

    function syncAcceptedAgreement(agreementId) {
        selectedSimulationAgreementId = agreementId;
        simulationAgreementSelect.value = agreementId;
        scenarioAgreementSelect.value = agreementId;
        renderSelectedSimulation();
    }

    function getSelectedAcceptedAgreement() {
        const selectedId = selectedSimulationAgreementId || simulationAgreementSelect.value || scenarioAgreementSelect.value;
        return readAcceptedAgreements().find(agreement => String(agreement.id) === selectedId) || null;
    }

    function renderSelectedSimulation() {
        const agreement = getSelectedAcceptedAgreement();
        if (!agreement) return;

        const isOwner = agreement.propietarioId === ownerId;
        const simulation = getSimulationRecord(readSimulations(), agreement.id);
        const conditions = simulation?.condiciones;

        simulationAgreementSummary.textContent = `${agreement.tituloOferta} · renta acordada: ${formatPrice(agreement.precioPropuesto)} / mes`;
        scenarioAgreementSummary.textContent = simulationAgreementSummary.textContent;
        simulationConditionsForm.hidden = !isOwner;
        simulationWaiting.hidden = isOwner || Boolean(conditions);
        simulationConditionsSummary.hidden = !conditions;
        simulationQuickCases.hidden = !conditions;
        simulationCases.hidden = !conditions;
        scenarioConditionsSummary.hidden = !conditions;
        scenarioConditionsPrompt.hidden = !isOwner || Boolean(conditions);
        scenarioWaiting.hidden = isOwner || Boolean(conditions);

        // --- Paneles de respuesta a las condiciones ---
        const simEstado = simulation?.estado || "PENDIENTE";
        simulationOwnerStatus.hidden = !(isOwner && conditions);
        simulationResponsePanel.hidden = !(!isOwner && conditions);

        if (isOwner && conditions) {
            const rechazada = simEstado === "RECHAZADA";
            simulationOwnerStatusBadge.textContent = rechazada ? "Rechazada" : "Pendiente de respuesta";
            simulationOwnerStatusBadge.className = `simulation-response-badge ${rechazada ? "rechazada" : "pendiente"}`;
            simulationOwnerStatusText.textContent = rechazada
                ? `El inquilino rechazó las condiciones${simulation?.motivoRechazo ? `: "${simulation.motivoRechazo}"` : "."} Puedes ajustarlas y volver a guardar.`
                : "Esperando que el inquilino acepte o rechace estas condiciones.";
        }

        if (!isOwner && conditions) {
            const yaRespondio = simEstado === "RECHAZADA" || simEstado === "ACEPTADA";
            simulationResponseStatus.hidden = !yaRespondio;
            simulationResponseMessage.textContent = "";
            simulationResponseMessage.className = "property-message";

            if (yaRespondio) {
                const rechazada = simEstado === "RECHAZADA";
                simulationResponseBadge.textContent = rechazada ? "Rechazada" : "Aceptada";
                simulationResponseBadge.className = `simulation-response-badge ${rechazada ? "rechazada" : "aceptada"}`;
                simulationResponseText.textContent = rechazada
                    ? "Rechazaste estas condiciones. El propietario puede ajustarlas y volver a guardar."
                    : "Aceptaste estas condiciones del acuerdo.";
                simulationRejectReason.value = simulation?.motivoRechazo || "";
            } else {
                simulationRejectReason.value = "";
            }

            simulationRejectButton.disabled = yaRespondio;
            simulationRejectReason.disabled = yaRespondio;
            simulationRejectButton.textContent = yaRespondio && simEstado === "RECHAZADA"
                ? "Condiciones rechazadas"
                : "Rechazar condiciones";
        }

        if (isOwner) {
            const values = conditions ? {
                ...conditions,
                montoGarantia: conditions.montoGarantia !== undefined ? conditions.montoGarantia : Number(agreement.garantiaPropuesta || 0)
            } : {
                montoGarantia: Number(agreement.garantiaPropuesta || 0),
                diasGracia: 5,
                recargoDiario: 0,
                limiteReparacion: 200,
                diasAviso: 30,
                penalidadSalida: 1,
                plazoRespuesta: 48,
                viaResolucion: "dialogo"
            };
            Object.entries(values).forEach(([name, value]) => {
                if (simulationConditionsForm.elements.namedItem(name)) {
                    simulationConditionsForm.elements.namedItem(name).value = value;
                }
            });
        }

        if (conditions) {
            renderSimulationConditions(conditions);
            renderSimulationConditionsInto(conditions, scenarioConditionsDetails);
            updateSimulationInputs();
            renderQuickSimulationResults(simulation?.resultados || {});

            const depositVal = conditions.montoGarantia !== undefined
                ? conditions.montoGarantia
                : Number(agreement.garantiaPropuesta || 0);

            const depositInput = document.getElementById("quickDepositAmount");
            const depositHelper = document.getElementById("quickDepositHelper");
            if (depositInput) {
                depositInput.value = depositVal;
            }
            if (depositHelper) {
                depositHelper.textContent = `Jalado de las condiciones del propietario: ${formatPrice(depositVal)}.`;
            }

            const damageInput = document.getElementById("quickDamageCost");
            const damageHelper = document.getElementById("quickDamageHelper");
            if (damageInput) {
                if (simulation?.costoReparacionSimulado !== undefined) {
                    damageInput.value = simulation.costoReparacionSimulado;
                    if (damageHelper) {
                        damageHelper.textContent = `Costo cargado de la última reparación simulada: ${formatPrice(simulation.costoReparacionSimulado)}.`;
                    }
                } else {
                    damageInput.value = 0;
                    if (damageHelper) {
                        damageHelper.textContent = "Sincronizado con la última reparación simulada.";
                    }
                }
            }
        } else {
            simulationScenarioResult.textContent = "";
        }
    }

    function renderSimulationConditions(conditions) {
        renderSimulationConditionsInto(conditions, simulationConditionsDetails);
    }

    function renderSimulationConditionsInto(conditions, container) {
        const agreement = getSelectedAcceptedAgreement();
        const depositAmount = conditions.montoGarantia !== undefined
            ? conditions.montoGarantia
            : Number(agreement?.garantiaPropuesta || 0);

        const resolutionPaths = {
            dialogo: "Diálogo directo",
            mediacion: "Mediación",
            notificacion: "Notificación formal"
        };
        const items = [
            `Garantía acordada: ${formatPrice(depositAmount)}`,
            `Gracia para pagos: ${conditions.diasGracia} días`,
            `Recargo diario: ${formatPrice(conditions.recargoDiario)}`,
            `Límite de reparaciones menores: ${formatPrice(conditions.limiteReparacion)}`,
            `Aviso de salida: ${conditions.diasAviso} días`,
            `Penalidad por salida: ${formatPrice(conditions.penalidadSalida)}`,
            `Respuesta a desacuerdos: ${conditions.plazoRespuesta} horas`,
            `Vía de resolución: ${resolutionPaths[conditions.viaResolucion] || conditions.viaResolucion}`
        ];
        container.replaceChildren();
        items.forEach(text => {
            const item = document.createElement("span");
            item.className = "simulation-condition-item";
            item.textContent = text;
            container.append(item);
        });
    }

    function populateSimulationCategories() {
        simulationScenarioGroups.forEach((group, index) => {
            const option = document.createElement("option");
            option.value = String(index);
            option.textContent = group.name;
            simulationCategory.append(option);
        });
        populateSimulationScenarios();
    }

    function populateSimulationScenarios() {
        const group = simulationScenarioGroups[Number(simulationCategory.value)];
        simulationScenario.replaceChildren();
        if (!group) return;

        group.situations.forEach((situation, index) => {
            const option = document.createElement("option");
            option.value = String(index);
            option.textContent = situation;
            simulationScenario.append(option);
        });
        updateSimulationInputs();
    }

    function getSelectedScenario() {
        const group = simulationScenarioGroups[Number(simulationCategory.value)];
        const situation = group?.situations[Number(simulationScenario.value)];
        return group && situation ? { group, situation, key: `${group.name}::${situation}` } : null;
    }

    function updateSimulationInputs() {
        const selected = getSelectedScenario();
        if (!selected) return;

        const { group, situation, key } = selected;
        const showAmount = group.fields.includes("amount");
        const showDays = group.fields.includes("days");
        simulationAmountField.hidden = !showAmount;
        simulationDaysField.hidden = !showDays;

        const amountLabels = {
            "Pagos y dinero": "Monto pagado, reclamado o en discusión (S/)",
            "Estado y daños del inmueble": "Costo estimado del daño (S/)",
            "Reparaciones y mantenimiento": "Costo estimado de reparación (S/)",
            Mascotas: "Costo estimado del daño (S/)",
            Contrato: "Monto relacionado con la condición (S/)",
            "Situaciones especiales": "Costo estimado del impacto (S/)"
        };
        const daysLabels = {
            "Pagos y dinero": "Días de retraso o plazo discutido",
            "Reparaciones y mantenimiento": "Días de demora o plazo discutido",
            Contrato: "Días de aviso o plazo discutido",
            "Situaciones especiales": "Días de afectación o plazo transcurrido"
        };
        simulationAmountLabel.textContent = amountLabels[group.name] || "Monto relacionado (S/)";
        simulationDaysLabel.textContent = daysLabels[group.name] || "Días relacionados";

        const result = getSimulationRecord(readSimulations(), getSelectedAcceptedAgreement()?.id)?.resultados?.[key];
        simulationScenarioResult.textContent = result?.resultado || "";
    }

    function simulateScenario() {
        const agreement = getSelectedAcceptedAgreement();
        if (!agreement) return;

        const simulations = readSimulations();
        const simulation = getSimulationRecord(simulations, agreement.id);
        if (!simulation?.condiciones) return;

        const selected = getSelectedScenario();
        if (!selected) return;

        const formData = new FormData(simulationScenarioForm);
        const conditions = simulation.condiciones;
        const monthlyRent = Number(agreement.precioPropuesto);
        const amount = Number(formData.get("monto")) || 0;
        const days = Number(formData.get("dias")) || 0;
        const details = formData.get("detalles").trim();
        const issue = selected.situation.toLowerCase();
        let result;

        if (selected.group.name === "Pagos y dinero" && issue.includes("retraso en el pago")) {
            const chargedDays = Math.max(0, days - conditions.diasGracia);
            const surcharge = chargedDays * conditions.recargoDiario;
            const outstanding = amount > 0 ? Math.max(0, monthlyRent - amount) : monthlyRent;
            result = chargedDays === 0
                ? `Para “${selected.situation}”, ${days} días están dentro de los ${conditions.diasGracia} días de gracia. Saldo estimado: ${formatPrice(outstanding)}; no se aplica recargo.`
                : `Para “${selected.situation}”, saldo estimado: ${formatPrice(outstanding)} más ${formatPrice(surcharge)} de recargo por ${chargedDays} días. Total: ${formatPrice(outstanding + surcharge)}.`;
        } else if (selected.group.name === "Pagos y dinero" && issue.includes("falta total de pago")) {
            const surcharge = Math.max(0, days - conditions.diasGracia) * conditions.recargoDiario;
            result = `Para “${selected.situation}”, la renta pendiente sería ${formatPrice(monthlyRent)}${surcharge ? ` más ${formatPrice(surcharge)} de recargo simulado` : ""}. Verifiquen comprobantes y fechas antes de concluir un incumplimiento.`;
        } else if (selected.group.name === "Pagos y dinero" && issue.includes("pago parcial")) {
            const remaining = Math.max(0, monthlyRent - amount);
            const surcharge = Math.max(0, days - conditions.diasGracia) * conditions.recargoDiario;
            result = `Para “${selected.situation}”, si se abonaron ${formatPrice(amount)}, quedaría un saldo estimado de ${formatPrice(remaining)}${surcharge ? ` y ${formatPrice(surcharge)} de recargo posible` : ""}.`;
        } else if (selected.group.name === "Pagos y dinero" && issue.includes("garantía")) {
            const agreedGuarantee = Number(agreement.garantiaPropuesta) || 0;
            const proposedReturn = Math.max(0, agreedGuarantee - amount);
            result = `Para “${selected.situation}”, la garantía acordada es ${formatPrice(agreedGuarantee)}. Si se retuvieran ${formatPrice(amount)}, la devolución estimada sería ${formatPrice(proposedReturn)}. Comparen inventario y evidencias antes de acordar descuentos.`;
        } else if (selected.group.name === "Pagos y dinero" && issue.includes("cambio del monto del alquiler")) {
            const difference = amount - monthlyRent;
            result = `Para “${selected.situation}”, la renta aceptada es ${formatPrice(monthlyRent)}. El monto indicado (${formatPrice(amount)}) ${difference > 0 ? `la supera por ${formatPrice(difference)}` : difference < 0 ? `es menor por ${formatPrice(Math.abs(difference))}` : "coincide con ella"}.`;
        } else if (selected.group.name === "Pagos y dinero" && issue.includes("penalidad")) {
            const expectedPenalty = Math.max(0, days - conditions.diasGracia) * conditions.recargoDiario;
            const difference = amount - expectedPenalty;
            result = `Para “${selected.situation}”, la penalidad según ${days} días y las condiciones sería ${formatPrice(expectedPenalty)}. El monto discutido (${formatPrice(amount)}) ${difference > 0 ? `supera la proyección en ${formatPrice(difference)}` : difference < 0 ? `está ${formatPrice(Math.abs(difference))} por debajo de la proyección` : "coincide con la proyección"}.`;
        } else if (selected.group.name === "Pagos y dinero") {
            result = `Para “${selected.situation}”, el monto registrado para revisar es ${formatPrice(amount)}. Comparen el contrato, los movimientos y sus comprobantes; la renta acordada figura como ${formatPrice(monthlyRent)} mensuales.`;
        } else if (["Estado y daños del inmueble", "Reparaciones y mantenimiento", "Mascotas"].includes(selected.group.name)) {
            const estimate = amount ? `Costo indicado: ${formatPrice(amount)}. ` : "";
            const limit = conditions.limiteReparacion;
            if (amount) {
                simulation.costoReparacionSimulado = amount;
                const damageInput = document.getElementById("quickDamageCost");
                const damageHelper = document.getElementById("quickDamageHelper");
                if (damageInput) {
                    damageInput.value = amount;
                }
                if (damageHelper) {
                    damageHelper.textContent = `Sincronizado con la reparación simulada: ${formatPrice(amount)}.`;
                }
            }
            let costProjection = amount
                ? amount <= limit
                    ? `Está dentro del límite de ${formatPrice(limit)} para reparaciones menores que el propietario asignó al inquilino.`
                    : `Supera el límite de ${formatPrice(limit)} para reparaciones menores que el propietario asignó al inquilino.`
                : `El límite acordado para reparaciones menores es ${formatPrice(limit)}.`;
            if (selected.group.name === "Reparaciones y mantenimiento" && (issue.includes("no responde") || issue.includes("demora") || issue.includes("coordinar"))) {
                const elapsedHours = days * 24;
                const overdueHours = Math.max(0, elapsedHours - conditions.plazoRespuesta);
                costProjection += overdueHours > 0
                    ? ` Han pasado ${elapsedHours} horas y se supera el plazo de respuesta de ${conditions.plazoRespuesta} horas por ${overdueHours} horas.`
                    : ` El tiempo indicado (${elapsedHours} horas) está dentro del plazo de respuesta de ${conditions.plazoRespuesta} horas.`;
            }
            result = `Para “${selected.situation}”, ${estimate}${costProjection} Registren fotos, causa y cotización; el cálculo no determina automáticamente quién tiene responsabilidad.`;
        } else if (issue.includes("terminar anticipadamente") || issue.includes("salida anticipada")) {
            const noticeDays = days;
            const penalty = Number(conditions.penalidadSalida) || 0;
            result = noticeDays >= conditions.diasAviso
                ? `Para “${selected.situation}”, el aviso de ${noticeDays} días cumple los ${conditions.diasAviso} días definidos. La simulación no calcula penalidad por falta de aviso.`
                : `Para “${selected.situation}”, faltarían ${conditions.diasAviso - noticeDays} días para cumplir el aviso definido. La penalidad de referencia sería ${formatPrice(penalty)}.`;
        } else {
            const paths = {
                dialogo: "diálogo directo entre las partes",
                mediacion: "mediación",
                notificacion: "notificación formal"
            };
            const extra = details ? ` Detalle aportado: ${details}.` : "";
            const amountText = amount ? ` Monto estimado relacionado: ${formatPrice(amount)}.` : "";
            const daysText = days ? ` Tiempo transcurrido indicado: ${days} días.` : "";
            result = `Escenario: ${selected.situation} La vía inicial definida es ${paths[conditions.viaResolucion]}. Plazo de respuesta: ${conditions.plazoRespuesta} horas.${amountText}${daysText}${extra} Revisen el contrato y las evidencias antes de acordar una medida.`;
        }

        simulation.resultados = simulation.resultados || {};
        simulation.resultados[selected.key] = {
            categoria: selected.group.name,
            situacion: selected.situation,
            resultado: result,
            simuladoPor: ownerId,
            simuladoEn: new Date().toISOString()
        };
        saveSimulation(simulations, simulation);
        simulationScenarioResult.textContent = result;
    }

    function renderQuickSimulationResults(results) {
        const resultTargets = {
            pago: "quickPaymentResult",
            reparacion: "quickRepairResult",
            salida: "quickExitResult",
            garantia: "quickDepositResult"
        };

        Object.entries(resultTargets).forEach(([scenario, targetId]) => {
            const target = document.getElementById(targetId);
            if (!target) return;
            const resObj = results[`rapido:${scenario}`];
            target.textContent = resObj?.resultado || "";
            target.className = resObj?.tipo ? `simulation-result ${resObj.tipo}` : "simulation-result";
        });
    }

    function simulateQuickScenario(form) {
        const agreement = getSelectedAcceptedAgreement();
        if (!agreement) return;

        const simulations = readSimulations();
        const simulation = getSimulationRecord(simulations, agreement.id);
        if (!simulation?.condiciones) return;

        const formData = new FormData(form);
        const conditions = simulation.condiciones;
        const monthlyRent = Number(agreement.precioPropuesto);
        const scenario = form.dataset.quickCase;
        let result;
        let statusType = "info";

        if (scenario === "pago") {
            const daysLate = Number(formData.get("dias"));
            const chargedDays = Math.max(0, daysLate - conditions.diasGracia);
            const surcharge = chargedDays * conditions.recargoDiario;
            result = chargedDays === 0
                ? `Con ${daysLate} días de retraso, el pago queda dentro de los ${conditions.diasGracia} días de gracia. No se aplica recargo.`
                : `Se aplicarían ${formatPrice(surcharge)} de recargo por ${chargedDays} días. Total estimado: ${formatPrice(monthlyRent + surcharge)}.`;
        } else if (scenario === "reparacion") {
            const amount = Number(formData.get("monto")) || 0;
            const responsible = amount <= conditions.limiteReparacion ? "inquilino" : "propietario";
            result = `Según el límite acordado (${formatPrice(conditions.limiteReparacion)}), esta reparación de ${formatPrice(amount)} correspondería al ${responsible}.`;

            // Guardar costo simulado de reparación para vincularlo con la garantía
            simulation.costoReparacionSimulado = amount;

            const damageInput = document.getElementById("quickDamageCost");
            const damageHelper = document.getElementById("quickDamageHelper");
            if (damageInput) {
                damageInput.value = amount;
            }
            if (damageHelper) {
                damageHelper.textContent = `Actualizado con la última reparación simulada: ${formatPrice(amount)}.`;
            }
        } else if (scenario === "salida") {
            const noticeDays = Number(formData.get("dias"));
            const penalty = Number(conditions.penalidadSalida) || 0;
            result = noticeDays >= conditions.diasAviso
                ? `El aviso de ${noticeDays} días cumple los ${conditions.diasAviso} días acordados. No se aplicaría penalidad.`
                : `Faltarían ${conditions.diasAviso - noticeDays} días de aviso. La penalidad simulada sería ${formatPrice(penalty)}.`;
        } else if (scenario === "garantia") {
            const deposit = Number(formData.get("montoGarantia") || conditions.montoGarantia || agreement.garantiaPropuesta || 0);
            const appliesToRent = formData.get("aplicaAlquiler") === "si";
            const damage = Number(formData.get("montoDanios")) || 0;
            const rent = Number(agreement.precioPropuesto) || 0;

            const saldoDisponible = deposit - damage;

            if (appliesToRent) {
                if (saldoDisponible >= rent) {
                    const saldoFinal = saldoDisponible - rent;
                    statusType = "success";
                    result = `La garantía disponible tras reparaciones (${formatPrice(deposit)}${damage > 0 ? ` menos ${formatPrice(damage)} = ${formatPrice(saldoDisponible)}` : ""}) CUBRE la cuota de alquiler de ${formatPrice(rent)}. SÍ se puede renovar/pagar un mes más de alquiler con la garantía.${saldoFinal > 0 ? ` Queda un saldo restante a favor del inquilino de ${formatPrice(saldoFinal)}, el cual debe ser devuelto en un plazo máximo de 15 días tras finalizar el contrato.` : " No queda saldo sobrante a devolver."}`;
                } else {
                    const faltante = rent - saldoDisponible;
                    statusType = "warning";
                    result = `Garantía (${formatPrice(deposit)}) - Reparaciones/Daños (${formatPrice(damage)}) = ${formatPrice(saldoDisponible)} disponibles. Al ser menor que la cuota de alquiler mensual (${formatPrice(rent)}), NO se puede renovar un mes más el alquiler con la garantía. El inquilino deberá abonar una diferencia de ${formatPrice(faltante)} para poder cubrir el mes.`;
                }
            } else {
                if (damage === 0) {
                    statusType = "success";
                    result = `No hay deducciones por daños ni deudas. El propietario devolverá el 100% de la garantía (${formatPrice(deposit)}) en un plazo máximo de 15 días posteriores a la entrega del inmueble.`;
                } else if (saldoDisponible >= 0) {
                    statusType = "info";
                    result = `Garantía (${formatPrice(deposit)}) - Reparaciones/Daños (${formatPrice(damage)}) = Saldo a favor del inquilino de ${formatPrice(saldoDisponible)}. Se devolverá en un plazo máximo de 15 días tras finalizar el contrato.`;
                } else {
                    const deuda = Math.abs(saldoDisponible);
                    statusType = "warning";
                    result = `Garantía (${formatPrice(deposit)}) - Reparaciones/Daños (${formatPrice(damage)}) = Saldo negativo de -${formatPrice(deuda)}. La garantía no cubre el costo total de reparaciones; el inquilino deberá abonar ${formatPrice(deuda)} adicionales.`;
                }
            }
        }

        simulation.resultados = simulation.resultados || {};
        simulation.resultados[`rapido:${scenario}`] = {
            resultado: result,
            tipo: statusType,
            simuladoPor: ownerId,
            simuladoEn: new Date().toISOString()
        };
        saveSimulation(simulations, simulation);
        renderQuickSimulationResults(simulation.resultados);
    }

    function createOfferCard(offer) {
        const card = document.createElement("article");
        card.className = "rental-card";

        const photo = document.createElement("div");
        photo.className = "rental-photo";
        if (offer.foto) {
            const image = document.createElement("img");
            image.src = offer.foto;
            image.alt = offer.titulo;
            photo.append(image);
        } else {
            photo.classList.add("rental-photo-placeholder");
            photo.textContent = "Sin foto";
        }

        const badge = document.createElement("span");
        badge.className = "listing-badge";
        badge.textContent = offer.tipo;
        photo.append(badge);

        const details = document.createElement("div");
        details.className = "rental-details";

        const location = document.createElement("p");
        location.className = "rental-location";
        location.textContent = offer.ubicacion;

        const title = document.createElement("h3");
        title.textContent = offer.titulo;

        const description = document.createElement("p");
        description.className = "rental-description";
        description.textContent = offer.descripcion;

        const features = document.createElement("span");
        features.className = "offer-features";
        const bedroomsLabel = offer.dormitorios === 1 ? "dormitorio" : "dormitorios";
        const bathroomsLabel = offer.banos === 1 ? "baño" : "baños";
        features.textContent = `${offer.dormitorios} ${bedroomsLabel} · ${offer.banos} ${bathroomsLabel} · ${offer.area} m²`;

        const footer = document.createElement("div");
        footer.className = "rental-footer";
        footer.append(features, createPrice(offer.precio));

        details.append(location, title, description, footer);

        if (offer.direccion) {
            const address = document.createElement("p");
            address.className = "offer-extra";
            address.textContent = `Dirección: ${offer.direccion}`;
            details.append(address);
        }
        if (offer.garantia > 0 || offer.mantenimiento > 0) {
            const costs = document.createElement("p");
            costs.className = "offer-extra";
            const extras = [];
            if (offer.garantia > 0) extras.push(`Garantía: ${formatPrice(offer.garantia)}`);
            if (offer.mantenimiento > 0) extras.push(`Mantenimiento: ${formatPrice(offer.mantenimiento)}/mes`);
            costs.textContent = extras.join(" · ");
            details.append(costs);
        }

        if (offer.propietarioId && offer.propietarioId !== ownerId) {
            const actionArea = document.createElement("div");
            actionArea.className = "offer-request-area";
            const existingRequest = getApplicantRequest(offer);
            const acceptedRequest = getAcceptedRequestFor(ownerId);

            if (existingRequest && existingRequest.estado !== "RECHAZADA") {
                const requestStatus = document.createElement("p");
                requestStatus.className = `request-status-note ${existingRequest.estado.toLowerCase()}`;
                requestStatus.textContent = getRequestStatusLabel(existingRequest.estado);
                actionArea.append(requestStatus);
            } else if (acceptedRequest) {
                const requestStatus = document.createElement("p");
                requestStatus.className = "request-status-note aceptada";
                requestStatus.textContent = "Ya tienes una solicitud aceptada.";
                actionArea.append(requestStatus);
            } else {
                const requestButton = document.createElement("button");
                requestButton.type = "button";
                requestButton.className = "request-offer-button";
                requestButton.textContent = "Mandar solicitud de aceptación";
                requestButton.addEventListener("click", () => openAcceptanceDialog(offer));
                actionArea.append(requestButton);
            }

            details.append(actionArea);
        }

        card.append(photo, details);
        return card;
    }

    function createPrice(amount) {
        const price = document.createElement("strong");
        price.append(document.createTextNode(formatPrice(amount)));
        const period = document.createElement("small");
        period.textContent = " / mes";
        price.append(period);
        return price;
    }

    function formatPrice(amount) {
        return new Intl.NumberFormat("es-PE", {
            style: "currency",
            currency: "PEN",
            maximumFractionDigits: 0
        }).format(amount);
    }

    function resizePhoto(file) {
        if (!file.type.startsWith("image/")) {
            return Promise.reject(new Error("Selecciona un archivo de imagen."));
        }
        if (file.size > 8 * 1024 * 1024) {
            return Promise.reject(new Error("La foto debe pesar menos de 8 MB."));
        }

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = () => reject(new Error("No se pudo leer la foto."));
            reader.onload = () => {
                const image = new Image();
                image.onerror = () => reject(new Error("No se pudo procesar la foto."));
                image.onload = () => {
                    const scale = Math.min(1, 1200 / Math.max(image.width, image.height));
                    const canvas = document.createElement("canvas");
                    canvas.width = Math.round(image.width * scale);
                    canvas.height = Math.round(image.height * scale);
                    canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL("image/jpeg", 0.78));
                };
                image.src = reader.result;
            };
            reader.readAsDataURL(file);
        });
    }


    /* =========================
       LOGOUT
    ========================== */

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    logoutButton.addEventListener(
        "click",
        () => {

            localStorage.removeItem("nanysmart_usuario_actual");
            localStorage.removeItem("alquismart_usuario_actual");

            window.location.href =
                "index.html";

        }
    );

});