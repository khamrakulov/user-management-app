using Microsoft.EntityFrameworkCore;
using user_management_app.Models;

namespace user_management_app.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .ToTable("users")
                .Property(u => u.RegistrationTime)
                .HasDefaultValueSql("NOW() AT TIME ZONE 'utc'");
            modelBuilder.Entity<User>()
                .Property(u => u.Status)
                .HasConversion<string>();
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}
