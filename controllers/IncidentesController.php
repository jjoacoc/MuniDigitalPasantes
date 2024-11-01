<?php

include_once '../models/Incidentes.php'; // El modelo de Incidentes
include_once '../core/Database.php';   // Conexión a la base de datos

class IncidentController {
    private $db;
    private $incident;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->incident = new Incident($this->db);
    }

    // Obtener todos los incidentes
    public function getAll() {
        $stmt = $this->incident->getAll();
        $incident = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($incident);
    }

    // Obtener un incidente por ID
    public function getById($Id_Incidentes) {
        $incident = $this->incident->getById($Id_Incidentes);
        return json_encode($incident);
    }

    // Crear un nuevo incidente
    public function create($data) {
        $this->incident->Id_Areas_Servicios = $data->Id_Areas_Servicios;
        $this->incident->Id_Tipos_Incidentes = $data->Id_Tipos_Incidentes;
        $this->incident->Id_Prioridad = $data->Id_Prioridad;
        $this->incident->Id_Origen = $data->Id_Origen;
        $this->incident->Fecha_Hora = $data->Fecha_Hora;
        // $this->incident->Otros_Datos = $data->Otros_Datos;
        $this->incident->Observaciones = $data->Observaciones;
        // $this->incident->Id_Ciudadanos = $data->Id_Ciudadanos;
        if ($this->incident->create()) {
            return json_encode(["message" => "OK"]);
        }
        return json_encode(["message" => "Error al crear el incidente"]);
    }

    // Actualizar un incidente
    public function update($Id_Incidentes, $data) {
        $this->incident->Fecha_Hora = $data->Fecha_Hora;        
        // $this->incident->Otros_Datos = $data->Otros_Datos;
        $this->incident->Observaciones = $data->Observaciones;
        $this->incident->Id_Areas_Servicios = $data->Id_Areas_Servicios;
        $this->incident->Id_Tipos_Incidentes = $data->Id_Tipos_Incidentes;
        $this->incident->Id_Prioridad = $data->Id_Prioridad;
        $this->incident->Id_Origen = $data->Id_Origen;
        $this->incident->Id_Ciudadanos = $data->Id_Ciudadanos;
        if ($this->incident->update($Id_Incidentes)) {
            return json_encode(["message" => "OK"]);
        }
        return json_encode(["message" => "Error al actualizar el incidente"]);
    }

    // Eliminar un incidente
    public function delete($Id_Incidentes) {
        if ($this->incident->delete($Id_Incidentes)) {
            return json_encode(["message" => "OK"]);
        }
        return json_encode(["message" => "Error al eliminar el incidente"]);
    }
}
