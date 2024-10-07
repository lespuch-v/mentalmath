using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class UpdateUserNameDto
    {
        [Required]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "Username must be between 5 and 20 charactes.")]
        public string NewUsername { get; set; }
    }
}
