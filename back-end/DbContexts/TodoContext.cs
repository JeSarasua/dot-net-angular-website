using back_end.Entities;
using Microsoft.EntityFrameworkCore;

namespace back_end.DbContexts;

public class TodoContext : DbContext
{
    public DbSet<Todo> Todos { get; set; }
}
