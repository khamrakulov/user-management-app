using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using user_management_app.Data;
using user_management_app.Dtos;
using user_management_app.Models;
using user_management_app.Services;

namespace user_management_app.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;

        public AuthController(AppDbContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (string.IsNullOrEmpty(dto.Name) || string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password))
                return BadRequest(new { message = "All fields are required" });

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Status = UserStatus.Active
            };

            try
            {
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Registration successful" });
            }
            catch (DbUpdateException)
            {
                return BadRequest(new { message = "Email already exists" });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _authService.Authenticate(dto.Email, dto.Password);
            if (user is null)
                return Unauthorized(new { message = "Invalid credentials or user is blocked" });

            var token = _authService.GenerateJwtToken(user);
            return Ok(new { token, message = "Login successful" });
        }
    }
   
}