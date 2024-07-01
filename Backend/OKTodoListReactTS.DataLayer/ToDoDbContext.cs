using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using OKTodoListReactTS.DataLayer.Entities;

namespace OKTodoListReactTS.DataLayer
{
    public class ToDoDbContext : DbContext
    {
        public DbSet<ToDoEntry> ToDo { get; set; } = null!;

        protected IHttpContextAccessor? HttpContextAccessor { get; }

        // Konstruktor für Dependency Injection
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options) 
            : base(options)
        {
        }
        
        /// <summary>
         /// Constructor used for dependency injection.
         /// </summary>
         /// <param name="options"></param>
         /// <param name="httpContextAccessor"></param>
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options, IHttpContextAccessor httpContextAccessor) 
            : base(options)
        {
            HttpContextAccessor = httpContextAccessor;
        }

        public override int SaveChanges()
        {
            OnBeforeSaving();
            return base.SaveChanges();
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            OnBeforeSaving();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            OnBeforeSaving();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess,
            CancellationToken cancellationToken = new CancellationToken())
        {
            OnBeforeSaving();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        /// <summary>
        /// Method that is executed before saving the changes to the database.
        /// Automatically sets 'created' and 'updated' fields for the affected entities
        /// </summary>
        private void OnBeforeSaving()
        {
            var httpContext = HttpContextAccessor;
            IEnumerable<EntityEntry> entries = ChangeTracker.Entries();
            DateTime now = DateTime.UtcNow;
            string userName = httpContext == null ? "System" : httpContext.HttpContext.User.Identity.Name;
            foreach (EntityEntry entry in entries)
            {
                if (!(entry.Entity is BaseEntity entity))
                    continue;
                switch (entry.State)
                {
                    case EntityState.Modified:
                        // set the updatedOn date to "now"
                        entity.UpdatedOn = now;
                        // set the updatedBy field to the authenticated user
                        entity.UpdatedBy = userName;

                        // mark created* properties as "don't touch", forbid update on a Modify operation
                        entry.Property(nameof(entity.CreatedOn)).IsModified = false;
                        entry.Property(nameof(entity.CreatedBy)).IsModified = false;
                        break;
                    case EntityState.Added:
                        // set both updatedOn and createdOn date to "now"
                        entity.CreatedOn = now;
                        entity.UpdatedOn = now;
                        // set both updatedBy and createdBy date to the authenticated user
                        entity.CreatedBy = userName;
                        entity.UpdatedBy = userName;
                        break;
                }
            }
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