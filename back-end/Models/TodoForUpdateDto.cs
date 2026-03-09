using System.ComponentModel.DataAnnotations;

namespace back_end.Models;

public class TodoForUpdateDto
{
    [Required]
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTimeOffset? DueDate { get; set; }
    [Required]
    public TodoStatus Status { get; set; }
}
