namespace back_end.Models;

public interface ITodoRepository
{
    IList<Todo> AllTodos { get; set; }
    Todo? GetTodoById(int todoId);
    void CreateTodo(TodoForCreationDto createTodo);
    void UpdateTodoById(int todoId, TodoForUpdateDto updatedTodo);
    void DeleteTodoById(int todoId);
}
