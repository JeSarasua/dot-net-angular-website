using back_end.Entities;
using back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end.DbContexts;

public class TodoContext : DbContext
{
    public DbSet<Todo> Todos { get; set; }

    public TodoContext(DbContextOptions<TodoContext> options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<Todo>()
            .HasData(
                new Todo
                {
                    Id = 1,
                    Name = "Clean the kitchen",
                    Description = "Wipe the counters, do the dishes, and sweep the floor",
                    CreatedDate = new DateTimeOffset(2026, 2, 8, 0, 0, 0, TimeSpan.Zero),
                    DueDate = new DateTimeOffset(2026, 2, 13, 0, 0, 0, TimeSpan.Zero),
                    Status = TodoStatus.ToDo,
                },
                new Todo
                {
                    Id = 2,
                    Name = "Review Pull Request",
                    Description = "Review the authentication logic in the new login module",
                    CreatedDate = new DateTimeOffset(2026, 2, 7, 0, 0, 0, TimeSpan.Zero),
                    DueDate = new DateTimeOffset(2026, 2, 9, 0, 0, 0, TimeSpan.Zero),
                    Status = TodoStatus.InProgress,
                },
                new Todo
                {
                    Id = 3,
                    Name = "Book Dentist Appointment",
                    Description = "Call Dr. Smith for a routine checkup and cleaning",
                    CreatedDate = new DateTimeOffset(2026, 2, 8, 0, 0, 0, TimeSpan.Zero),
                    DueDate = new DateTimeOffset(2026, 2, 22, 0, 0, 0, TimeSpan.Zero),
                    Status = TodoStatus.ToDo,
                },
                new Todo
                {
                    Id = 4,
                    Name = "Submit Monthly Report",
                    Description = "Compile all expenses and progress updates for January",
                    CreatedDate = new DateTimeOffset(2026, 2, 3, 0, 0, 0, TimeSpan.Zero),
                    DueDate = new DateTimeOffset(2026, 2, 7, 0, 0, 0, TimeSpan.Zero),
                    Status = TodoStatus.InProgress,
                },
                new Todo
                {
                    Id = 5,
                    Name = "Gym Session",
                    Description = "Leg day and 20 minutes of cardio",
                    CreatedDate = new DateTimeOffset(2026, 2, 8, 0, 0, 0, TimeSpan.Zero),
                    DueDate = new DateTimeOffset(2026, 2, 8, 16, 0, 0, TimeSpan.Zero),
                    Status = TodoStatus.ToDo,
                },
                new Todo
                {
                    Id = 6,
                    Name = "Make my bed",
                    Description = "Straighten the sheets, fluff the pillows, and pull up the duvet",
                    CreatedDate = new DateTimeOffset(2026, 2, 7, 23, 0, 0, TimeSpan.Zero),
                    DueDate = new DateTimeOffset(2026, 2, 8, 0, 0, 0, TimeSpan.Zero),
                    Status = TodoStatus.Completed,
                }
            );

        base.OnModelCreating(modelBuilder);
    }
}
