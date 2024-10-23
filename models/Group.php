<?php
class Group {
    private $conn;
    private $table = "Grupos";

    public $Id_Grupos;
  
    public $Nombres;
   

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todos los productos
    public function getAll() {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Obtener un solo producto por ID
    public function getById($Id_Grupos) {
        $query = "SELECT * FROM " . $this->table . " WHERE Id_Grupos = :Id_Grupos";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":Id_Grupos", $Id_Grupos);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear un producto nuevo
    public function create() {
        $query = "INSERT INTO " . $this->table . " (Nombres) VALUES (:Nombres)";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':Nombres', $this->Nombres);
     
        return $stmt->execute();
    }

    // Actualizar un producto
    public function update($Id_Grupos) {
        // Aquí solo actualizamos la descripción
        $query = "UPDATE " . $this->table . " SET Nombres = :Nombres WHERE Id_Grupos = :Id_Grupos";
        $stmt = $this->conn->prepare($query);
        
        // Enlazamos los parámetros
        $stmt->bindParam(':Nombres', $this->Nombres);
        $stmt->bindParam(':Id_Grupos', $Id_Grupos); // El Id_Grupos pasado no se modifica
        
        // Ejecutamos la consulta
        return $stmt->execute();
    }

    // Eliminar un producto
    public function delete($Id_Grupos) {
        $query = "DELETE FROM " . $this->table . " WHERE Id_Grupos = :Id_Grupos";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':Id_Grupos', $Id_Grupos);
        return $stmt->execute();
    }
}
?>