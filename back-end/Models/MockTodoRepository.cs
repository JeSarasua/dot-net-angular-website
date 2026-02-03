using System;

namespace back_end.Models;

public class MockTodoRepository : ITodoRepository
{
    public IEnumerable<Todo> AllTodos =>
        new List<Todo>
        {
            new Todo
            {
                Id = 1,
                Name = "Clean the kitchen",
                Description = "Wipe the counters, do the dishes, and sweep the floor",
                CreatedDate = DateTimeOffset.UtcNow,
                DueDate = DateTimeOffset.UtcNow.AddDays(5),
                Status = TodoStatus.ToDo,
            },
            new Todo
            {
                Id = 2,
                Name = "Review Pull Request",
                Description = "Review the authentication logic in the new login module",
                CreatedDate = DateTimeOffset.UtcNow.AddDays(-1),
                DueDate = DateTimeOffset.UtcNow.AddDays(1),
                Status = TodoStatus.InProgress,
            },
            new Todo
            {
                Id = 3,
                Name = "Book Dentist Appointment",
                Description = "Call Dr. Smith for a routine checkup and cleaning",
                CreatedDate = DateTimeOffset.UtcNow,
                DueDate = DateTimeOffset.UtcNow.AddDays(14),
                Status = TodoStatus.ToDo,
            },
            new Todo
            {
                Id = 4,
                Name = "Submit Monthly Report",
                Description = "Compile all expenses and progress updates for January",
                CreatedDate = DateTimeOffset.UtcNow.AddDays(-5),
                DueDate = DateTimeOffset.UtcNow.AddDays(-1),
                Status = TodoStatus.InProgress,
            },
            new Todo
            {
                Id = 5,
                Name = "Gym Session",
                Description = "Leg day and 20 minutes of cardio",
                CreatedDate = DateTimeOffset.UtcNow,
                DueDate = DateTimeOffset.UtcNow.AddHours(4),
                Status = TodoStatus.ToDo,
            },
            new Todo
            {
                Id = 6,
                Name = "Make my bed",
                Description = "Straighten the sheets, fluff the pillows, and pull up the duvet",
                CreatedDate = DateTimeOffset.UtcNow.AddHours(-1),
                DueDate = DateTimeOffset.UtcNow,
                Status = TodoStatus.Completed,
            },
        };

    public Todo? GetTodoById(int todoId)
    {
        foreach (var todo in AllTodos)
        {
            if (todo.Id == todoId)
            {
                return todo;
            }
        }
        return null;
    }
}
