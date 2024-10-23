<?php
// app/controllers/ProductController.php

include_once '../models/Group.php';
include_once '../core/Database.php';

class GroupController {
    private $db;
    private $grupo;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->grupo = new Group($this->db);
    }

    // Obtener todos los Grupos
    public function getAll() {
        $stmt = $this->grupo->getAll();
        $grupo = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($grupo);
    }

    // Obtener un Grupo por ID
    public function getById($Id_Grupos) {
        $grupo = $this->grupo->getById($Id_Grupos);
        return json_encode($grupo);
    }

    // Crear un nuevo Grupo
    public function create($data) {
        $this->grupo->Nombres = $data->Nombres;
        
        if ($this->grupo->create()) {
            return json_encode(["message" => "OK"]);
        }
        return json_encode(["message" => "Error al crear el Grupo"]);
    }

    // Actualizar un Grupo
    public function update($Id_Grupos, $data) {
        $this->grupo->Nombres = $data->Nombres;
        if ($this->grupo->update($Id_Grupos)) {
            return json_encode(["message" => "OK"]);
        }
        return json_encode(["message" => "Error al actualizar el Grupo"]);
    }

    // Eliminar un Grupo
    public function delete($Id_Grupos) {
        if ($this->grupo->delete($Id_Grupos)) {
            return json_encode(["message" => "OK"]);
        }
        return json_encode(["message" => "Error al eliminar el Grupo"]);
    }
}
?>