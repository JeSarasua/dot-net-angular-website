using back_end.Entities;

namespace back_end.Models;

public interface ITodoRepository
{
    Task<IEnumerable<Todo>> GetTodosAsync();
    Task<Todo?> GetTodoAsync(int todoId);
    void CreateTodo(Todo todo);

    Task<bool> SaveChangesAsync();
    Task<bool> TodoExistsAsync(int todoId);
}
