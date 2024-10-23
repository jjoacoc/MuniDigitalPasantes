<?php
include_once '../models/User.php';
include_once '../core/Database.php';
class AuthController {
   
    private $secret_key = "tu_clave_secreta";


    private $db;
    private $login;

    public function __construct()
    {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->login = new User($this->db);
    }


     // Autenticar usuario
     public function login($data)
     {
         $email = $data->email;
         $Pass = $data->Pass;
         $user = $this->login->authenticate($email, $Pass);
         if ($user) {
             return json_encode(["resultado" => "OK", "usuario" => $user]);
         } else {
             return json_encode(["resultado" => "Error", "mensaje" => "Credenciales incorrectas"]);
         }
     }


    // public function login($db, $email, $Pass) {
        
    //     $user = new User($db);
    //     $usuarioData = $user->getUserByEmail($email);

    //     // if ($usuarioData && password_verify($Pass, $usuarioData['Pass'])) {
    //     //     $token = $this->generateJWT($usuarioData['Id_Usuarios'], $usuarioData['Id_Grupos']);
    //     //     return json_encode(["token" => $token]);
    //     // } else {
    //     //     return json_encode(["message" => "Credenciales inválidas"]);
    //     // }
    // }

    // private function base64UrlEncode($data) {
    //     return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    // }

    // private function generateJWT($Id_Usuarios, $Id_Grupos) {
    //     $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    //     $payload = json_encode([
    //         'iss' => 'localhost',
    //         'iat' => time(),
    //         'exp' => time() + (60 * 60),  // Expira en 1 hora
    //         'sub' => $Id_Usuarios,
    //         'Id_Grupos' => $Id_Grupos
    //     ]);

    //     $base64UrlHeader = $this->base64UrlEncode($header);
    //     $base64UrlPayload = $this->base64UrlEncode($payload);
    //     $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $this->secret_key, true);
    //     $base64UrlSignature = $this->base64UrlEncode($signature);

    //     return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    // }

    // public function verifyJWT($jwt) {
    //     $parts = explode('.', $jwt);
    //     if (count($parts) === 3) {
    //         $header = base64_decode($parts[0]);
    //         $payload = base64_decode($parts[1]);
    //         $signature_provided = $parts[2];

    //         $signature_valid = $this->base64UrlEncode(hash_hmac('sha256', "$parts[0].$parts[1]", $this->secret_key, true));

    //         if ($signature_valid === $signature_provided) {
    //             $payload_data = json_decode($payload, true);
    //             if ($payload_data['exp'] > time()) {
    //                 return $payload_data;
    //             }
    //         }
    //     }
    //     return false;
    // }
}

?>