-- =========================================================
--  NANYSMART - Tabla de SIMULACIONES
--  Guarda las condiciones definidas por el propietario para
--  cada solicitud aceptada, y la respuesta del inquilino.
--  Ejecutar en la base de datos: alquiler_nany
-- =========================================================

CREATE TABLE IF NOT EXISTS simulaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id VARCHAR(100),
    propietario_id VARCHAR(100),
    inquilino_id VARCHAR(100),
    titulo_oferta VARCHAR(255),
    monto_garantia DOUBLE,
    dias_gracia INT,
    recargo_diario DOUBLE,
    limite_reparacion DOUBLE,
    dias_aviso INT,
    penalidad_salida DOUBLE,
    plazo_respuesta INT,
    via_resolucion VARCHAR(50),
    estado VARCHAR(50),
    motivo_rechazo LONGTEXT,
    fecha_definida DATETIME,
    fecha_respuesta DATETIME
);

-- Índices útiles para las búsquedas que hace la app
CREATE INDEX idx_simulaciones_solicitud ON simulaciones (solicitud_id);
CREATE INDEX idx_simulaciones_propietario ON simulaciones (propietario_id);
CREATE INDEX idx_simulaciones_inquilino ON simulaciones (inquilino_id);
