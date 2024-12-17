using Microsoft.EntityFrameworkCore;
using ecommerce_api.Models;
namespace ecommerce_api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; } 
    }
}
