<?php
// app/core/Router.php
include_once '../controllers/UserController.php';  // Controlador de usuarios
include_once '../controllers/GroupController.php'; // Controlador de grupos
include_once '../controllers/AuthController.php';  // Controlador de autenticación
include_once '../controllers/IncidentesController.php'; //Controlador de incidentes
include_once '../views/View.php'; // Vista para renderizado de datos


$database = new Database();  // Cambia esto según tu clase de conexión
$db = $database->getConnection();  // Método que devuelve la conexión


// Obtener la entidad (product, user, group)
$entity = $_GET['entity'];  // Por defecto, se asume que es producto

// Definir el controlador basado en la entidad
switch ($entity) {
    case 'login':
        $controller = new AuthController();

        break;

    case 'users':
        $controller = new UserController();
        break;

    case 'groups':
        $controller = new GroupController();
        break;
    default:
    case 'incident':
        $controller = new IncidentController();
        break;

        View::render(json_encode(["message" => "Entidad no reconocida"]));
        exit();
}

// Inicializar el controlador de autenticación
$authController = new AuthController();
// Verificar si el método es protegido
$method = $_SERVER['REQUEST_METHOD'];


if ($method === 'POST' && $entity === 'login') {
    // Ruta de autenticación para iniciar sesión (login)

    // Obtener los datos de la solicitud (email y password)
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->email) && isset($data->Pass)) {
        // Llamar al método login del controlador de autenticación
        $result = $controller->login($db, $data->email, $data->Pass);

        // Devolver el resultado en formato JSON
        View::render($result);
    } else {
        // Si no se reciben los datos correctos
        View::render(json_encode(["message" => "Faltan datos para la autenticación"]));
    }
    exit();
}


$protected_methods = ['POST', 'PUT', 'DELETE'];

// Si es un método protegido, verificar el token JWT
if (in_array($method, $protected_methods)) {
    // Obtener el token del header Authorization
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization'];
        $token = str_replace('Bearer ', '', $authHeader);  // Extraer el token
        $verified = $authController->verifyJWT($token);    // Verificar el token

        // Si el token no es válido o expirado, denegar el acceso
        if (!$verified) {
            View::render(json_encode(["message" => "Token no válido o expirado"]));
            exit();
        }
    } else {
        View::render(json_encode(["message" => "Token no proporcionado"]));
        exit();
    }
}

// Ejecutar la acción basada en el método HTTP
switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $result = $controller->getById($_GET['id']);
        } else {
            $result = $controller->getAll();
        }
        View::render($result);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $result = $controller->create($data);
        View::render($result);
        break;

    case 'PUT':
        if (isset($_GET['id'])) {
            $data = json_decode(file_get_contents("php://input"));
            $result = $controller->update($_GET['id'], $data);
            View::render($result);
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $result = $controller->delete($_GET['id']);
            View::render($result);
        }
        break;

    default:
        View::render(json_encode(["message" => "Método no permitido"]));
        break;
}
?>