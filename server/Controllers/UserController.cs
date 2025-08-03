using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using user_management_app.Data;
using user_management_app.Dtos;
using user_management_app.Models;

namespace user_management_app.Controllers
{
    [Route("api/users")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users
                .OrderByDescending(u => u.LastLoginTime)
                .Select(u => new { u.Id, u.Name, u.Email, u.LastLoginTime, u.RegistrationTime, u.Status })
                .ToListAsync();
            return Ok(users);
        }

        [HttpPost("block")]
        public async Task<IActionResult> BlockUsers([FromBody] UserIdsDto dto)
        {
            var users = await _context.Users.Where(u => dto.userIds.Contains(u.Id)).ToListAsync();
            foreach (var user in users)
                user.Status = UserStatus.Blocked;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Users blocked successfully" });
        }

        [HttpPost("unblock")]
        public async Task<IActionResult> UnblockUsers([FromBody] UserIdsDto dto)
        {
            var users = await _context.Users.Where(u => dto.userIds.Contains(u.Id)).ToListAsync();
            foreach (var user in users)
                user.Status = UserStatus.Active;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Users unblocked successfully" });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUsers([FromBody] UserIdsDto dto)
        {
            var users = await _context.Users.Where(u => dto.userIds.Contains(u.Id)).ToListAsync();
            _context.Users.RemoveRange(users);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Users deleted successfully" });
        }
    }
}