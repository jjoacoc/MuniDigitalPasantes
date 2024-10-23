<?php
// // app/core/Router.php

// // Incluir los controladores necesarios
// include_once '../controllers/GroupController.php'; // Controlador para la gestión de grupos
// include_once '../controllers/UserController.php';  // Controlador para la gestión de usuarios
// include_once '../views/View.php';                   // Clase para la renderización de las vistas

// // Obtener el método HTTP de la solicitud
// $method = $_SERVER['REQUEST_METHOD'];

// // Verificar si la URL contiene '/users' para gestionar solicitudes relacionadas con usuarios
// if (strpos($_SERVER['REQUEST_URI'], '/users') !== false) {
//     $userController = new UserController(); // Crear una instancia del controlador de usuarios

//     // En función del método HTTP, se ejecuta la lógica correspondiente
//     switch ($method) {
//         case 'GET':
//             // Si se proporciona un 'Id', se obtiene el usuario específico
//             if (isset($_GET['Id_Usuarios'])) {
//                 $result = $userController->getById($_GET['Id_Usuarios']);
//             } else {
//                 // Si no se proporciona 'Id_Usuarios', se obtienen todos los usuarios
//                 $result = $userController->getAll();
//             }
//             View::render($result); // Renderizar la respuesta
//             break;

//         case 'POST':

//             // Decodifica el cuerpo de la petición HTTP que contiene los datos enviados, usualmente en formato JSON.
//             // El contenido JSON es convertido en un objeto PHP y almacenado en $data.
//             // $data = json_decode(file_get_contents("php://input"));

//             // Verifica si en la URL se ha pasado el parámetro 'action' y si su valor es 'login'.
//             if (isset($_GET['action']) && $_GET['action'] === 'login') {
//                 // Si la acción es 'login', llama al método login del controlador de usuarios, pasando los datos del cuerpo como parámetro.
//                 // $result contendrá el resultado de la operación de login.
//                 $result = $userController->login($data);
//             } else {
//                 // Si no es 'login', por defecto, llamará al método create del controlador de usuarios.
//                 // Esto se utiliza para crear un nuevo usuario u otro tipo de acción por defecto.
//                 $result = $userController->create($data);
//             }

//             // Finalmente, llama al método render de la clase View para mostrar el resultado al cliente.
//             // View::render() puede encargarse de devolver una respuesta en JSON o en otro formato.
//             View::render($result);


//         case 'PUT':
//             // Para actualizar un usuario, se requiere 'Id'
//             if (isset($_GET['Id_Usuarios'])) {
//                 $data = json_decode(file_get_contents("php://input"));
//                 $result = $userController->update($_GET['Id_Usuarios'], $data); // Llamar al método update del controlador
//                 View::render($result); // Renderizar la respuesta
//             }
//             break;

//         case 'DELETE':
//             // Para borrar un usuario, se requiere 'Id'
//             if (isset($_GET['Id_Usuarios'])) {
//                 $result = $userController->delete($_GET['Id_Usuarios']); // Llamar al método delete del controlador
//                 View::render($result); // Renderizar la respuesta
//             }
//             break;

//         default:
//             View::render(json_encode(["message" => "Método no permitido"])); // Respuesta para métodos no permitidos
//             break;
//     }
// }
// // Verificar si la URL contiene '/groups' para gestionar solicitudes relacionadas con grupos
// elseif (strpos($_SERVER['REQUEST_URI'], '/groups') !== false) {
//     $groupController = new GroupController(); // Crear una instancia del controlador de grupos

//     // En función del método HTTP, se ejecuta la lógica correspondiente
//     switch ($method) {
//         case 'GET':
//             // Si se proporciona un 'Id_Grupos', se obtiene el grupo específico
//             if (isset($_GET['Id_Grupos'])) {
//                 $result = $groupController->getById($_GET['Id_Grupos']);
//             } else {
//                 // Si no se proporciona 'Id_Grupos', se obtienen todos los grupos
//                 $result = $groupController->getAll();
//             }
//             View::render($result); // Renderizar la respuesta
//             break;

//         case 'POST':
//             // Para crear un nuevo grupo, se obtienen los datos del cuerpo de la solicitud
//             $data = json_decode(file_get_contents("php://input"));
//             $result = $groupController->create($data); // Llamar al método create del controlador
//             View::render($result); // Renderizar la respuesta
//             break;

//         case 'PUT':
//             // Para actualizar un grupo, se requiere 'Id_Grupos'
//             if (isset($_GET['Id_Grupos'])) {
//                 $data = json_decode(file_get_contents("php://input"));
//                 $result = $groupController->update($_GET['Id_Grupos'], $data); // Llamar al método update del controlador
//                 View::render($result); // Renderizar la respuesta
//             }
//             break;

//         case 'DELETE':
//             // Para borrar un grupo, se requiere 'Id_Grupos'
//             if (isset($_GET['Id_Grupos'])) {
//                 $result = $groupController->delete($_GET['Id_Grupos']); // Llamar al método delete del controlador
//                 View::render($result); // Renderizar la respuesta
//             }
//             break;

//         default:
//             View::render(json_encode(["message" => "Método no permitido"])); // Respuesta para métodos no permitidos
//             break;
//     }
// }
// // Si la URL no contiene '/users' ni '/groups', se devuelve un error
// else {
//     View::render(json_encode(["message" => "Endpoint no válido"])); // Respuesta para endpoints no válidos
// }

?>

<?php
// app/core/Router.php
include_once '../controllers/UserController.php';  // Controlador de usuarios
include_once '../controllers/GroupController.php'; // Controlador de grupos
include_once '../controllers/AuthController.php';  // Controlador de autenticación
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


// $protected_methods = ['POST', 'PUT', 'DELETE'];

// // Si es un método protegido, verificar el token JWT
// if (in_array($method, $protected_methods)) {
//     // Obtener el token del header Authorization
//     $headers = getallheaders();
//     if (isset($headers['Authorization'])) {
//         $authHeader = $headers['Authorization'];
//         $token = str_replace('Bearer ', '', $authHeader);  // Extraer el token
//         $verified = $authController->verifyJWT($token);    // Verificar el token

//         // Si el token no es válido o expirado, denegar el acceso
//         if (!$verified) {
//             View::render(json_encode(["message" => "Token no válido o expirado"]));
//             exit();
//         }
//     } else {
//         View::render(json_encode(["message" => "Token no proporcionado"]));
//         exit();
//     }
// }

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