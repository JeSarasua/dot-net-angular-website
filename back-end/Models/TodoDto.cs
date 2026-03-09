using System.ComponentModel.DataAnnotations;

namespace back_end.Models;

public class TodoDto
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTimeOffset CreatedDate { get; set; }
    public DateTimeOffset? DueDate { get; set; }
    [Required]
    public TodoStatus Status { get; set; }
}
