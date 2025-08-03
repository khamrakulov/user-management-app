namespace user_management_app.Dtos
{
    public class RegisterDto
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
