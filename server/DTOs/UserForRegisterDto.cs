using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Password must be at least 3 characters.")]
        public string Password { get; set; }
    }
}
