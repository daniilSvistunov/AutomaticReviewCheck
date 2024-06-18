using Microsoft.EntityFrameworkCore;
using OKTemplate.DataLayer.Entities;

namespace OKTemplate.DataLayer
{
    public class ToDoDbContext : DbContext
    {
        public DbSet<ToDoEntry> ToDo { get; set; } = null!;

        // Konstruktor für Dependency Injection
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ToDoEntry>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.CreatedOn).HasDefaultValueSql("(getutcdate())");
                entity.Property(e => e.UpdatedOn).HasDefaultValueSql("(getutcdate())");
            });
        }
    }
}
