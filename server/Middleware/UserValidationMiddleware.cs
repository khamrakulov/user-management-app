using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using user_management_app.Data;
using user_management_app.Models; // Add this to use UserStatus

namespace user_management_app.Middleware
{
    public class UserValidationMiddleware
    {
        private readonly RequestDelegate _next;

        public UserValidationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, AppDbContext dbContext)
        {
            // Allow preflight CORS requests to pass without validation
            if (context.Request.Method == HttpMethods.Options)
            {
                context.Response.StatusCode = StatusCodes.Status204NoContent;
                return;
            }

            if (context.User.Identity?.IsAuthenticated == true &&
                !context.Request.Path.StartsWithSegments("/api/auth"))
            {
                var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim is null || !int.TryParse(userIdClaim.Value, out var userId))
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Invalid user ID in token");
                    return;
                }

                var user = await dbContext.Users.FindAsync(userId);
                if (user is null || user.Status == UserStatus.Blocked)
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("User is blocked or does not exist");
                    return;
                }
            }

            await _next(context);
        }
    }

    public static class UserValidationMiddlewareExtensions
    {
        public static IApplicationBuilder UseUserValidation(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<UserValidationMiddleware>();
        }
    }
}