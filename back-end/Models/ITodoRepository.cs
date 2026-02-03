namespace back_end.Models;

public interface ITodoRepository
{
    IEnumerable<Todo> AllTodos { get; }

    Todo? GetTodoById(int todoId);
}
