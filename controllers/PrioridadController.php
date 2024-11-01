<?php
// app/controllers/PrioridadController.php

include_once '../models/Prioridad.php';
include_once '../core/Database.php';

class PrioridadController
{
    private $db;
    private $prioridad;

    public function __construct()
    {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->prioridad = new Prioridad($this->db);
    }

    public function getAll()
    {
        $stmt = $this->prioridad->getAll();
        $prioridad = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($prioridad);
    }
}
