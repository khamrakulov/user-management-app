using System.ComponentModel.DataAnnotations;

namespace user_management_app.Models
{
    public enum UserStatus
    {
        Active,
        Blocked
    }

    public class User
    {
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
        [Required, EmailAddress]
        public required string Email { get; set; }
        [Required]
        public required string PasswordHash { get; set; }
        public DateTime RegistrationTime { get; set; } // Default set in OnModelCreating
        public DateTime? LastLoginTime { get; set; }
        public UserStatus Status { get; set; } = UserStatus.Active;
    }
}
