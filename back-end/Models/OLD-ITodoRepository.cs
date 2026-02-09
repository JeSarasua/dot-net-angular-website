namespace back_end.Models;

public interface OLDITodoRepository
{
    IList<TodoDto> AllTodos { get; set; }
    TodoDto? GetTodoById(int todoId);
    void CreateTodo(TodoForCreationDto createTodo);
    void UpdateTodoById(int todoId, TodoForUpdateDto updatedTodo);
    void DeleteTodoById(int todoId);
}
