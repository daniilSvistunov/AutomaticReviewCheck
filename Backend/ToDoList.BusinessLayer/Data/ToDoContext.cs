using Microsoft.EntityFrameworkCore;
using ToDoList.BusinessLayer.Entities;

namespace ToDoList.BusinessLayer.Data
{
    public class ToDoContext : DbContext
    {
        public ToDoContext(DbContextOptions<ToDoContext> options)
            : base(options)
        {
        }

        public DbSet<ToDoItem> ToDoItems { get; set; } = null!;
    }
}
