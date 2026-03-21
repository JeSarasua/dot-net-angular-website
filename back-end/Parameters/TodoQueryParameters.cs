using back_end.Binders;
using back_end.Models;
using Microsoft.AspNetCore.Mvc;

public class TodoQueryParameters
{
    public string? Name { get; set; }
    public string? SearchQuery { get; set; }

    [ModelBinder(BinderType = typeof(CommaDelimitedArrayModelBinder<TodoStatus>))]
    public List<TodoStatus>? Statuses { get; set; }
    public string SortBy { get; set; } = "Name";
    public string SortOrder { get; set; } = "asc";
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}