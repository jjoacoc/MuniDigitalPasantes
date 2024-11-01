<?php
// app/models/TiposIncidentes.php

class Tipos_Incidentes
{
    private $conn;
    private $tableTipoIncidente = "Tipos_Incidentes";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll()
    {
        $query = "SELECT * FROM " . $this->tableTipoIncidente;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

}
