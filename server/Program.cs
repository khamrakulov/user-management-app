using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using user_management_app.Data;
using user_management_app.Middleware;
using user_management_app.Services;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] 
                ?? throw new InvalidOperationException("JWT Key is not configured")))
        };
    });

// Services
builder.Services.AddScoped<AuthService>();

// Controllers
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// CORS policy — adjust origin to match your frontend URL
var MyAllowAllOrigins = "_myAllowAllOrigins"; // Ensure this policy name is unique and consistently used.
                                             // Also, verify no other [EnableCors] or app.UseCors()
                                             // calls are overriding this policy with a stricter one.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowAllOrigins,
                      policy =>
                      {
                          // This predicate allows any origin.
                          // It's equivalent to AllowAnyOrigin() but allows AllowCredentials()
                          // because it sends back the specific requesting origin, not a wildcard (*).
                          policy.SetIsOriginAllowed(origin => true) // Allows any origin
                                .AllowAnyMethod()                   // Allows all HTTP methods
                                .AllowAnyHeader()                   // Allows all headers
                                .AllowCredentials();                // Allows credentials (e.g., cookies, Authorization headers)
                      });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseRouting();

// CORS must be before authentication/authorization
app.UseCors(MyAllowAllOrigins); // Apply the defined policy

app.UseAuthentication();
app.UseAuthorization();

// Removed the custom OPTIONS preflight handling middleware.
// app.Use(async (context, next) =>
// {
//     if (context.Request.Method == HttpMethods.Options)
//     {
//         context.Response.StatusCode = StatusCodes.Status204NoContent;
//         return;
//     }
//     await next();
// });

// Custom user validation middleware
app.UseUserValidation();

app.MapControllers();

app.Run();


// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.IdentityModel.Tokens;
// using System.Text;
// using System.Text.Json.Serialization;
// using user_management_app.Data;
// using user_management_app.Middleware;
// using user_management_app.Services;

// var builder = WebApplication.CreateBuilder(args);

// // Database
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// // Authentication
// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidateIssuer = true,
//             ValidateAudience = true,
//             ValidateLifetime = true,
//             ValidateIssuerSigningKey = true,
//             ValidIssuer = builder.Configuration["Jwt:Issuer"],
//             ValidAudience = builder.Configuration["Jwt:Audience"],
//             IssuerSigningKey = new SymmetricSecurityKey(
//                 Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] 
//                 ?? throw new InvalidOperationException("JWT Key is not configured")))
//         };
//     });

// // Services
// builder.Services.AddScoped<AuthService>();

// // Controllers
// builder.Services.AddControllers()
//     .AddJsonOptions(options =>
//     {
//         options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
//     });

// // CORS policy — adjust origin to match your frontend URL
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowAll", policy =>
//         policy
//             .WithOrigins("http://localhost:3001") // frontend origin
//             .AllowAnyMethod()
//             .AllowAnyHeader()
//             .AllowCredentials());
// });

// var app = builder.Build();

// if (app.Environment.IsDevelopment())
// {
//     app.UseDeveloperExceptionPage();
// }

// app.UseRouting();

// // CORS must be before authentication/authorization
// app.UseCors("AllowAll");

// app.UseAuthentication();
// app.UseAuthorization();

// // Ensure OPTIONS preflight passes through
// app.Use(async (context, next) =>
// {
//     if (context.Request.Method == HttpMethods.Options)
//     {
//         context.Response.StatusCode = StatusCodes.Status204NoContent;
//         return;
//     }
//     await next();
// });

// // Custom user validation middleware
// app.UseUserValidation();

// app.MapControllers();

// app.Run();
