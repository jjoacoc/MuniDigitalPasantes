<?php
// app/controllers/AreasServiciosController.php

include_once '../models/AreasServicios.php';
include_once '../core/Database.php';

class AreasServiciosController
{
    private $db;
    private $areaServicio;

    public function __construct()
    {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->areaServicio = new Areas_Servicios($this->db);
    }

    // Obtener todos los ciudadanos
    public function getAll()
    {
        $stmt = $this->areaServicio->getAll();
        $areaServicio = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($areaServicio);
    }


    // Obtener un Area de Servicio por ID
    public function getById($Id_Areas_Servicios) {
        $areaServicio = $this->areaServicio->getById($Id_Areas_Servicios);
        return json_encode($areaServicio);
    }

    // Crear un nuevo Area de Servicio
    public function create($data) {
        $this->areaServicio->Descripcion = $data->Descripcion;
        
        if ($this->areaServicio->create()) {
            return json_encode(["message" => "OK"]);
        }
        return json_encode(["message" => "Error al crear el Area de Servicio"]);
    }

    // Actualizar un Area de Servicio
    public function update($Id_Areas_Servicios, $data) {
        $this->areaServicio->Descripcion = $data->Descripcion;
        if ($this->areaServicio->update($Id_Areas_Servicios)) {
            return json_encode(["message" => "OK"]);
        }
        return json_encode(["message" => "Error al actualizar el Area de Servicio"]);
    }

    // Eliminar un Area de Servicio
    public function delete($Id_Areas_Servicios) {
        if ($this->areaServicio->delete($Id_Areas_Servicios)) {
            return json_encode(["message" => "OK"]);
        }
        return json_encode(["message" => "Error al eliminar el Area de Servicio"]);
    }


}
