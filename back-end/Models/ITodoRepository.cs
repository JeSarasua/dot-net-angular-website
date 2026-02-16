using back_end.Entities;

namespace back_end.Models;

public interface ITodoRepository
{
    Task<IEnumerable<Todo>> GetTodosAsync();
    Task<(IEnumerable<Todo>, PaginationMetadata)> GetTodosAsync(string? name, string? searchQuery, int pageNumber, int pageSize);
    Task<Todo?> GetTodoAsync(int todoId);
    void CreateTodo(Todo todo);
    void DeleteTodo(Todo todo);

    Task<bool> SaveChangesAsync();
    Task<bool> TodoExistsAsync(int todoId);
}
