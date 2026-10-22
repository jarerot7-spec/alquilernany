import java.sql.*;

public class CreateSolicitudesTable {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/alquiler_nany?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
        try (Connection conn = DriverManager.getConnection(url, "root", "root");
             Statement stmt = conn.createStatement()) {
            
            // Alter ofertas to add propietario_correo if not exists
            try {
                stmt.executeUpdate("ALTER TABLE ofertas ADD COLUMN propietario_correo VARCHAR(255)");
            } catch (SQLException ignored) {
                // Column might already exist
            }

            // Create solicitudes table
            stmt.executeUpdate("CREATE TABLE IF NOT EXISTS solicitudes (" +
                "id BIGINT AUTO_INCREMENT PRIMARY KEY, " +
                "client_request_id VARCHAR(100), " +
                "oferta_id VARCHAR(100), " +
                "propietario_id VARCHAR(100), " +
                "propietario_correo VARCHAR(255), " +
                "solicitante_id VARCHAR(100), " +
                "solicitante_nombre VARCHAR(255), " +
                "solicitante_correo VARCHAR(255), " +
                "solicitante_telefono VARCHAR(50), " +
                "titulo_oferta VARCHAR(255), " +
                "precio_publicado DOUBLE, " +
                "precio_propuesto DOUBLE, " +
                "garantia_propuesta DOUBLE, " +
                "fecha_ingreso VARCHAR(50), " +
                "mensaje LONGTEXT, " +
                "estado VARCHAR(50), " +
                "fecha_solicitud DATETIME)"
            );
            System.out.println("TABLE 'solicitudes' READY IN MYSQL!");
        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

