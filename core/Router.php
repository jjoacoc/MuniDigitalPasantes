<?php
// app/core/Router.php

// Incluir los controladores necesarios
include_once '../controllers/GroupController.php'; // Controlador para la gestión de grupos
include_once '../controllers/UserController.php';  // Controlador para la gestión de usuarios
include_once '../views/View.php';                   // Clase para la renderización de las vistas

// Obtener el método HTTP de la solicitud
$method = $_SERVER['REQUEST_METHOD'];

// Verificar si la URL contiene '/users' para gestionar solicitudes relacionadas con usuarios
if (strpos($_SERVER['REQUEST_URI'], '/users') !== false) {
    $userController = new UserController(); // Crear una instancia del controlador de usuarios

    // En función del método HTTP, se ejecuta la lógica correspondiente
    switch ($method) {
        case 'GET':
            // Si se proporciona un 'Id', se obtiene el usuario específico
            if (isset($_GET['Id_Usuarios'])) {
                $result = $userController->getById($_GET['Id_Usuarios']);
            } else {
                // Si no se proporciona 'Id_Usuarios', se obtienen todos los usuarios
                $result = $userController->getAll();
            }
            View::render($result); // Renderizar la respuesta
            break;

        case 'POST':

            // Decodifica el cuerpo de la petición HTTP que contiene los datos enviados, usualmente en formato JSON.
            // El contenido JSON es convertido en un objeto PHP y almacenado en $data.
            // $data = json_decode(file_get_contents("php://input"));

            // Verifica si en la URL se ha pasado el parámetro 'action' y si su valor es 'login'.
            if (isset($_GET['action']) && $_GET['action'] === 'login') {
                // Si la acción es 'login', llama al método login del controlador de usuarios, pasando los datos del cuerpo como parámetro.
                // $result contendrá el resultado de la operación de login.
                $result = $userController->login($data);
            } else {
                // Si no es 'login', por defecto, llamará al método create del controlador de usuarios.
                // Esto se utiliza para crear un nuevo usuario u otro tipo de acción por defecto.
                $result = $userController->create($data);
            }

            // Finalmente, llama al método render de la clase View para mostrar el resultado al cliente.
            // View::render() puede encargarse de devolver una respuesta en JSON o en otro formato.
            View::render($result);


        case 'PUT':
            // Para actualizar un usuario, se requiere 'Id'
            if (isset($_GET['Id_Usuarios'])) {
                $data = json_decode(file_get_contents("php://input"));
                $result = $userController->update($_GET['Id_Usuarios'], $data); // Llamar al método update del controlador
                View::render($result); // Renderizar la respuesta
            }
            break;

        case 'DELETE':
            // Para borrar un usuario, se requiere 'Id'
            if (isset($_GET['Id_Usuarios'])) {
                $result = $userController->delete($_GET['Id_Usuarios']); // Llamar al método delete del controlador
                View::render($result); // Renderizar la respuesta
            }
            break;

        default:
            View::render(json_encode(["message" => "Método no permitido"])); // Respuesta para métodos no permitidos
            break;
    }
}
// Verificar si la URL contiene '/groups' para gestionar solicitudes relacionadas con grupos
elseif (strpos($_SERVER['REQUEST_URI'], '/groups') !== false) {
    $groupController = new GroupController(); // Crear una instancia del controlador de grupos

    // En función del método HTTP, se ejecuta la lógica correspondiente
    switch ($method) {
        case 'GET':
            // Si se proporciona un 'Id_Grupos', se obtiene el grupo específico
            if (isset($_GET['Id_Grupos'])) {
                $result = $groupController->getById($_GET['Id_Grupos']);
            } else {
                // Si no se proporciona 'Id_Grupos', se obtienen todos los grupos
                $result = $groupController->getAll();
            }
            View::render($result); // Renderizar la respuesta
            break;

        case 'POST':
            // Para crear un nuevo grupo, se obtienen los datos del cuerpo de la solicitud
            $data = json_decode(file_get_contents("php://input"));
            $result = $groupController->create($data); // Llamar al método create del controlador
            View::render($result); // Renderizar la respuesta
            break;

        case 'PUT':
            // Para actualizar un grupo, se requiere 'Id_Grupos'
            if (isset($_GET['Id_Grupos'])) {
                $data = json_decode(file_get_contents("php://input"));
                $result = $groupController->update($_GET['Id_Grupos'], $data); // Llamar al método update del controlador
                View::render($result); // Renderizar la respuesta
            }
            break;

        case 'DELETE':
            // Para borrar un grupo, se requiere 'Id_Grupos'
            if (isset($_GET['Id_Grupos'])) {
                $result = $groupController->delete($_GET['Id_Grupos']); // Llamar al método delete del controlador
                View::render($result); // Renderizar la respuesta
            }
            break;

        default:
            View::render(json_encode(["message" => "Método no permitido"])); // Respuesta para métodos no permitidos
            break;
    }
}
// Si la URL no contiene '/users' ni '/groups', se devuelve un error
else {
    View::render(json_encode(["message" => "Endpoint no válido"])); // Respuesta para endpoints no válidos
}
