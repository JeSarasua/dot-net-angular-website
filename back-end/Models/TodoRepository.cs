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

    public async Task<(IEnumerable<Todo>, PaginationMetadata)> GetTodosAsync(TodoQueryParameters query)
    {
        var todos = _context.Todos as IQueryable<Todo>;
        var name = query.Name;
        var searchQuery = query.SearchQuery;
        var pageSize = query.PageSize;
        var pageNumber = query.PageNumber;
        var statuses = query.Statuses;
        var sortOrder = query.SortOrder;
        var sortBy = query.SortBy;


        // Status Filter
        if (query.Statuses != null && query.Statuses.Any())
        {
            todos = todos.Where(todo => query.Statuses.Contains(todo.Status));
        }

        // FILTERS FIXME: This is unused
        if (!string.IsNullOrWhiteSpace(name))
        {
            name = name.Trim();
            todos = todos.Where(todo => todo.Name == name);
        }

        // SEARCH
        if (!string.IsNullOrWhiteSpace(searchQuery))
        {
            searchQuery = searchQuery.Trim();
            todos = todos.Where(todo =>
                EF.Functions.ILike(todo.Name, $"%{searchQuery}%") ||
                (todo.Description != null && EF.Functions.ILike(todo.Description, $"%{searchQuery}%")));
        }

        // SORTING
        todos = query.SortBy?.ToLower() switch
        {
            "status" => query.SortOrder == "desc"
                ? todos.OrderByDescending(t => t.Status)
                : todos.OrderBy(t => t.Status),
            "duedate" => query.SortOrder == "desc"
                ? todos.OrderByDescending(t => t.DueDate)
                : todos.OrderBy(t => t.DueDate),
            "createddate" => query.SortOrder == "desc"
                ? todos.OrderByDescending(t => t.CreatedDate)
                : todos.OrderBy(t => t.CreatedDate),
            _ => query.SortOrder == "desc"
                ? todos.OrderByDescending(t => t.Name)
                : todos.OrderBy(t => t.Name),
        };

        var totalItemCount = await todos.CountAsync();

        var PaginationMetadata = new PaginationMetadata(totalItemCount, pageSize, pageNumber);

        var todosToReturn = await todos
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
