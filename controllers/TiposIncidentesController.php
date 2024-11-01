<?php
// app/controllers/TiposIncidentesController.php

include_once '../models/TiposIncidentes.php';
include_once '../core/Database.php';

class TiposIncidentesController
{
    private $db;
    private $tipoIncidente;

    public function __construct()
    {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->tipoIncidente = new Tipos_Incidentes($this->db);
    }
    public function getAll()
    {
        $stmt = $this->tipoIncidente->getAll();
        $tipoIncidente = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($tipoIncidente);
    }

}
