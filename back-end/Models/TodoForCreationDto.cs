namespace back_end.Models;

public class TodoForCreationDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTimeOffset DueDate { get; set; }
    public TodoStatus Status { get; set; }
}
