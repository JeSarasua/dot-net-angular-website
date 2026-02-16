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

    public async Task<(IEnumerable<Todo>, PaginationMetadata)> GetTodosAsync(string? name, string? searchQuery, int pageNumber, int pageSize)
    {
        var todos = _context.Todos as IQueryable<Todo>;

        // FILTERS
        if (!string.IsNullOrWhiteSpace(name))
        {
            name = name.Trim();
            todos = todos.Where(todo => todo.Name == name);
        }

        // SEARCH
        if (!string.IsNullOrWhiteSpace(searchQuery))
        {
            searchQuery = searchQuery.Trim();
            todos = todos.Where(todo => todo.Name.Contains(searchQuery) || (todo.Description != null && todo.Description.Contains(searchQuery)));
        }

        var totalItemCount = await todos.CountAsync();

        var PaginationMetadata = new PaginationMetadata(totalItemCount, pageSize, pageNumber);

        var todosToReturn = await todos.OrderBy(todo => todo.Name)
            .Skip(pageSize * (pageNumber - 1))
            .Take(pageSize)
            .ToListAsync();

        return (todosToReturn, PaginationMetadata);
    }

    public async Task<Todo?> GetTodoAsync(int todoId)
    {
        return await _context.Todos.Where(todo => todo.Id == todoId).FirstOrDefaultAsync();
    }

    public void CreateTodo(Todo todo)
    {
        _context.Todos.Add(todo);
    }

    public void DeleteTodo(Todo todo)
    {
        _context.Todos.Remove(todo);
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
