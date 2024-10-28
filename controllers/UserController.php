<?php
// app/controllers/ProductController.php

include_once '../models/User.php';
include_once '../core/Database.php';

class UserController {
    private $db;
    private $user;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->user = new User($this->db);
    }

    // Obtener todos los Usuarios
    public function getAll() {
        $stmt = $this->user->getAll();
        $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($user);
    }

    // Obtener un Usuario por ID
    public function getById($Id_Usuarios) {
        $user = $this->user->getById($Id_Usuarios);
        return json_encode($user);
    }

    // Crear un nuevo Usuario
    public function create($data) {
        $this->user->Nombres = $data->Nombres;
        $this->user->email = $data->email;
        $this->user->Pass = $data->Pass;
        $this->user->Id_Grupos = $data->Id_Grupos;
        if ($this->user->create()) {
            return json_encode(["message" => "OK"]);
        }
        return json_encode(["message" => "Error al crear el Usuario"]);
    }

    // Actualizar un Usuario
    public function update($Id_Usuarios, $data) {
        $this->user->Nombres = $data->Nombres;
        $this->user->email = $data->email;
        $this->user->Pass = $data->Pass;
        $this->user->Id_Grupos = $data->Id_Grupos;
        if ($this->user->update($Id_Usuarios)) {
            return json_encode(["message" => "OK"]);
        }
        return json_encode(["message" => "Error al actualizar el Usuario"]);
    }

    // Eliminar un Usuario
    public function delete($Id_Usuarios) {
        if ($this->user->delete($Id_Usuarios)) {
            return json_encode(["message" => "OK"]);
        }
        return json_encode(["message" => "Error al eliminar el Usuario"]);
    }

}
?>