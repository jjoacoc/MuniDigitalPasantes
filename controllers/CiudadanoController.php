<?php
// app/controllers/CiudadanoController.php

include_once '../models/Ciudadano.php';
include_once '../core/Database.php';

class CiudadanoController
{
    private $db;
    private $ciudadano;

    public function __construct()
    {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->ciudadano = new Ciudadano($this->db);
    }

    // Obtener todos los ciudadanos
    public function getAll()
    {
        $stmt = $this->ciudadano->getAll();
        $ciudadano = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($ciudadano);
    }

    // Obtener un ciudadano por ID
    public function getById($Id_Ciudadanos)
    {
        $ciudadano = $this->ciudadano->getById($Id_Ciudadanos);
        return json_encode($ciudadano);
    }

    // Crear un nuevo ciudadano
    public function create($data)
    {
        $this->ciudadano->Dni = $data->Dni;
        $this->ciudadano->Apellido_Nombre = $data->Apellido_Nombre;
        if ($this->ciudadano->create()) {
            return json_encode(["message" => "OK"]);
        }
        return json_encode(["message" => "Error al crear el ciudadano"]);
    }

    // Actualizar un ciudadano
    public function update($Id_Ciudadanos, $data)
    {
        $this->ciudadano->Apellido_Nombre = $data->Apellido_Nombre;
        if ($this->ciudadano->update($Id_Ciudadanos)) {
            return json_encode(["message" => "OK"]);
        }
        return json_encode(["message" => "Error al actualizar el ciudadano"]);
    }

    // Eliminar un ciudadano
    public function delete($Id_Ciudadanos)
    {
        if ($this->ciudadano->delete($Id_Ciudadanos)) {
            return json_encode(["message" => "OK"]);
        }
        return json_encode(["message" => "Error al eliminar el ciudadano"]);
    }
}
