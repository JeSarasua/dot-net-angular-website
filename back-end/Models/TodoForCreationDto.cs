using System.ComponentModel.DataAnnotations;

namespace back_end.Models;

public class TodoForCreationDto
{
    [Required]
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTimeOffset DueDate { get; set; }
    [Required]
    public TodoStatus Status { get; set; }
}
