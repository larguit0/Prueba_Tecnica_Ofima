namespace Api_Prueba.Models
{
    public class Empleado
    {
        public int Id { get; set; }
        public string Nombre { get; set; }

        public string Correo { get; set; }
        public string Cargo { get; set; }
        public string Departamento  { get; set; }
        public string Telefono { get; set; }
        public DateTime Fecha { get; set; }

        public bool Activo { get; set; }
      


    }
}
