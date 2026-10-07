
<?php
class Sanitizer {
    // Limpia texto plano eliminando etiquetas HTML y scripts dañinos (Prevención de XSS)
    public static function cleanString(?string $data): string {
        if ($data === null) return '';
        $data = trim($data);
        $data = strip_tags($data); // Elimina etiquetas HTML/PHP
        return htmlspecialchars($data, ENT_QUOTES, 'UTF-8'); // Convierte caracteres especiales
    }

    // Limpia y valida direcciones de Email
    public static function cleanEmail(?string $email): string {
        $email = filter_var(trim($email ?? ''), FILTER_SANITIZE_EMAIL);
        return filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';
    }

    // Limpia URLs (p. ej. Sitio Web o Redes Sociales)
    public static function cleanUrl(?string $url): string {
        $url = filter_var(trim($url ?? ''), FILTER_SANITIZE_URL);
        return filter_var($url, FILTER_VALIDATE_URL) ? $url : '';
    }

    // Limpia cadenas numéricas o de identificación (CUIT, Teléfonos, CBU)
    public static function cleanNumbersOnly(?string $data): string {
        return preg_replace('/[^0-9]/', '', $data ?? '');
    }
}
?>