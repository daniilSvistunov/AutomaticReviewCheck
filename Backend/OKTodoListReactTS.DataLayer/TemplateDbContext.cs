using Microsoft.EntityFrameworkCore;
using Objk.Plattform.Database;
using Objk.Plattform.Database.Entities.Application;
using Objk.Plattform.Database.Entities.Plattform;

namespace OKTemplate.DataLayer
{
    public class TemplateDbContext(DbContextOptions options) : PlattfomDbContext(options)
    {
        public DbSet<ApplicationPage> ApplicationPage { get; set; } = null!;

        public DbSet<ApplicationGroup> ApplicationGroup { get; set; } = null!;

        public DbSet<EventType> EventType { get; set; } = null!;
    }
}
