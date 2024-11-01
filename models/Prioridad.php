<?php
// app/models/Prioridad.php

class Prioridad
{
    private $conn;
    private $tablePrioridad = "Prioridad";

    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    public function getAll()
    {
        $query = "SELECT * FROM " . $this->tablePrioridad;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
