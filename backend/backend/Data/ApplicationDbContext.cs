using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        // Constructor que recibe opciones de configuración
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Tabla orders en la base de datos
        public DbSet<Order> CustomerOrders { get; set; }
    }
}