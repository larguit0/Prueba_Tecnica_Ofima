using Api_Prueba.Models;
using Microsoft.EntityFrameworkCore;
using MySqlX.XDevAPI;
namespace Api_Prueba.Context
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Empleado> Empleado { get; set; }

    }
}
