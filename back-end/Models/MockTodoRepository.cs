namespace back_end.Models;

public class MockTodoRepository : ITodoRepository
{
    public IList<TodoDto> AllTodos { get; set; } =
        new List<TodoDto>
        {
            new TodoDto
            {
                Id = 1,
                Name = "Clean the kitchen",
                Description = "Wipe the counters, do the dishes, and sweep the floor",
                CreatedDate = DateTimeOffset.UtcNow,
                DueDate = DateTimeOffset.UtcNow.AddDays(5),
                Status = TodoStatus.ToDo,
            },
            new TodoDto
            {
                Id = 2,
                Name = "Review Pull Request",
                Description = "Review the authentication logic in the new login module",
                CreatedDate = DateTimeOffset.UtcNow.AddDays(-1),
                DueDate = DateTimeOffset.UtcNow.AddDays(1),
                Status = TodoStatus.InProgress,
            },
            new TodoDto
            {
                Id = 3,
                Name = "Book Dentist Appointment",
                Description = "Call Dr. Smith for a routine checkup and cleaning",
                CreatedDate = DateTimeOffset.UtcNow,
                DueDate = DateTimeOffset.UtcNow.AddDays(14),
                Status = TodoStatus.ToDo,
            },
            new TodoDto
            {
                Id = 4,
                Name = "Submit Monthly Report",
                Description = "Compile all expenses and progress updates for January",
                CreatedDate = DateTimeOffset.UtcNow.AddDays(-5),
                DueDate = DateTimeOffset.UtcNow.AddDays(-1),
                Status = TodoStatus.InProgress,
            },
            new TodoDto
            {
                Id = 5,
                Name = "Gym Session",
                Description = "Leg day and 20 minutes of cardio",
                CreatedDate = DateTimeOffset.UtcNow,
                DueDate = DateTimeOffset.UtcNow.AddHours(4),
                Status = TodoStatus.ToDo,
            },
            new TodoDto
            {
                Id = 6,
                Name = "Make my bed",
                Description = "Straighten the sheets, fluff the pillows, and pull up the duvet",
                CreatedDate = DateTimeOffset.UtcNow.AddHours(-1),
                DueDate = DateTimeOffset.UtcNow,
                Status = TodoStatus.Completed,
            },
        };

    public TodoDto? GetTodoById(int todoId)
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

    public void CreateTodo(TodoForCreationDto createTodo)
    {
        TodoDto newTodo = new TodoDto
        {
            // Fixme this could result in a bug if Id overlaps
            Id = AllTodos.Count() + 1,
            Name = createTodo.Name,
            Description = createTodo.Description,
            CreatedDate = DateTimeOffset.UtcNow,
            DueDate = createTodo.DueDate,
            Status = createTodo.Status
        };

        // FIXME: Add validation

        AllTodos.Add(newTodo);
    }

    public void UpdateTodoById(int todoId, TodoForUpdateDto updatedTodo)
    {
        for (int i = 0; i < AllTodos.Count(); i++)
        {
            if (AllTodos[i].Id == todoId)
            {
                var existingTodo = AllTodos[i];

                existingTodo.Name = updatedTodo.Name;
                existingTodo.Description = updatedTodo.Description;
                existingTodo.DueDate = updatedTodo.DueDate;
                existingTodo.Status = updatedTodo.Status;
                return;
            }
        }
    }

    public void DeleteTodoById(int todoId)
    {
        for (int i = 0; i < AllTodos.Count(); i++)
        {
            if (AllTodos[i].Id == todoId)
            {
                var existingTodo = AllTodos[i];

                AllTodos.Remove(existingTodo);
                return;
            }
        }
    }
}
