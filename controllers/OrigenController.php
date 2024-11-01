<?php
// app/controllers/OrigenController.php

include_once '../models/Origen.php';
include_once '../core/Database.php';

class OrigenController
{
    private $db;
    private $origen;

    public function __construct()
    {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->origen = new Origen($this->db);
    }

    // Obtener todos los origenes
    public function getAll()
    {
        $stmt = $this->origen->getAll();
        $origen = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($origen);
    }

}
