using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class UserForLoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
