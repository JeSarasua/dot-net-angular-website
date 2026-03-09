using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using back_end.Models;

namespace back_end.Entities;

public class Todo
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; }

    [MaxLength(200)]
    public string? Description { get; set; }
    public DateTimeOffset CreatedDate { get; set; }
    public DateTimeOffset? DueDate { get; set; }
    public TodoStatus Status { get; set; }
}
