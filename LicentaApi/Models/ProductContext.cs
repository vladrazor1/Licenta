using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace LicentaApi.Models
{
    public class ProductContext : DbContext
    {

        protected readonly IConfiguration Configuration;



        public ProductContext(DbContextOptions<ProductContext> options, IConfiguration configuration) : base(options: options)
        {
            this.Configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseSqlServer(connectionString: Configuration.GetConnectionString("DefaultConnection"));
        }

        public DbSet<Product> Products { get; set; } = null!;

        public DbSet<Category> Categories { get; set; } = null!;

        public DbSet<Overbidding> Overbiddings { get; set; } = null!;
        
        public DbSet<User> ApplicationUsers { get; set; } = null!;
    }
}