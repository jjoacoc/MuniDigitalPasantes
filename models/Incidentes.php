<?php

class Incident
{
    private $conn;
    private $table_name = "Incidentes";

    public $Id_Incidentes;
    public $Fecha_Hora;
    // public $Otros_Datos;
    public $Observaciones;
    public $Id_Areas_Servicios;
    public $Id_Tipos_Incidentes;
    public $Id_Prioridad;
    public $Id_Origen;
    public $Id_Ciudadanos;
    //comentario
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Obtener todos los incidentes
    public function getAll()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Obtener un incidente por ID
    public function getById($Id_Incidentes)
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE Id_Incidentes = :Id_Incidentes";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":Id_Incidentes", $Id_Incidentes);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear un nuevo incidente
    public function create()
    {
        $query = "INSERT INTO " . $this->table_name . " (Id_Areas_Servicios, Id_Tipos_Incidentes, Id_Prioridad, Id_Origen, Fecha_Hora, Observaciones) VALUES (:Id_Areas_Servicios, :Id_Tipos_Incidentes, :Id_Prioridad, :Id_Origen, :Fecha_Hora, :Observaciones)";
        $stmt = $this->conn->prepare($query);
        // Vincular parámetros
        $stmt->bindParam(":Id_Areas_Servicios", $this->Id_Areas_Servicios);
        $stmt->bindParam(":Id_Tipos_Incidentes", $this->Id_Tipos_Incidentes);
        $stmt->bindParam(":Id_Prioridad", $this->Id_Prioridad);
        $stmt->bindParam(":Id_Origen", $this->Id_Origen);
        $stmt->bindParam(":Fecha_Hora", $this->Fecha_Hora);
        // $stmt->bindParam(":Otros_Datos", $this->Otros_Datos);
        $stmt->bindParam(":Observaciones", $this->Observaciones);
        // $stmt->bindParam(":Id_Ciudadanos", $this->Id_Ciudadanos);
        return $stmt->execute();
    }

    // Actualizar un incidente
    public function update($Id_Incidentes)
    {
        $query = "UPDATE " . $this->table_name . " SET
            Fecha_Hora = :Fecha_Hora,
            Observaciones = :Observaciones,
            Id_Areas_Servicios = :Id_Areas_Servicios,
            Id_Tipos_Incidentes = :Id_Tipos_Incidentes,
            Id_Prioridad = :Id_Prioridad,
            Id_Origen = :Id_Origen,
            Id_Ciudadanos = :Id_Ciudadanos
            WHERE Id_Incidentes = :Id_Incidentes";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":Id_Incidentes", $Id_Incidentes);
        $stmt->bindParam(":Fecha_Hora", $this->Fecha_Hora);
        $stmt->bindParam(":Observaciones", $this->Observaciones);
        $stmt->bindParam(":Id_Areas_Servicios", $this->Id_Areas_Servicios);
        $stmt->bindParam(":Id_Tipos_Incidentes", $this->Id_Tipos_Incidentes);
        $stmt->bindParam(":Id_Prioridad", $this->Id_Prioridad);
        $stmt->bindParam(":Id_Origen", $this->Id_Origen);
        // $stmt->bindParam(":Otros_Datos", $this->Otros_Datos);
        $stmt->bindParam(":Id_Ciudadanos", $this->Id_Ciudadanos);
        return $stmt->execute();
    }

    // Eliminar un incidente
    public function delete($Id_Incidentes)
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE Id_Incidentes = :Id_Incidentes";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":Id_Incidentes", $Id_Incidentes);
        return $stmt->execute();
    }
}
