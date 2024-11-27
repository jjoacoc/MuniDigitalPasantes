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


    public function create($data)
    {
        $this->areaServicio->Descripcion = $data->Descripcion;
        if ($this->areaServicio->create()) {
            return json_encode(["message" => "OK"]);
        }
        return json_encode(["message" => "Error al crear el Area de Servicio"]);
    }


}
