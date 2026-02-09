using back_end.DbContexts;
using back_end.Entities;
using Microsoft.EntityFrameworkCore;

namespace back_end.Models;

public class TodoRepository : ITodoRepository
{
    private readonly TodoContext _context;

    public TodoRepository(TodoContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task<IEnumerable<Todo>> GetTodosAsync()
    {
        return await _context.Todos.OrderBy(todo => todo.Name).ToListAsync();
    }

    public async Task<Todo?> GetTodoAsync(int todoId)
    {
        return await _context.Todos.Where(todo => todo.Id == todoId).FirstOrDefaultAsync();
    }

    public void CreateTodo(Todo todo)
    {
        _context.Todos.Add(todo);
    }



    public async Task<bool> SaveChangesAsync()
    {
        return (await _context.SaveChangesAsync() >= 0);
    }



    public async Task<bool> TodoExistsAsync(int todoId)
    {
        return await _context.Todos.AnyAsync(todo => todo.Id == todoId);
    }

}
