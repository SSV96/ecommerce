using ecommerce_api.Data;
using ecommerce_api.Helpers;
using ecommerce_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;

namespace ecommerce_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtHelper _jwtHelper;

        public UserController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;

            var jwtKey = configuration["Jwt:Key"] ?? throw new ArgumentNullException("Jwt:Key", "JWT Key is missing in configuration.");
            var jwtIssuer = configuration["Jwt:Issuer"] ?? throw new ArgumentNullException("Jwt:Issuer", "JWT Issuer is missing in configuration.");

            _jwtHelper = new JwtHelper(
            jwtKey,
            jwtIssuer
         );
        }
        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] UserSignupRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
                return BadRequest("Email is already registered.");

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password); // Hash password

            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                Password = hashedPassword
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                return Unauthorized("Invalid email or password.");

            var token = _jwtHelper.GenerateToken(user.UserId, user.Email);
            return Ok(new { Token = token });
        }

        [Authorize]
        [HttpGet("protected")]
        public IActionResult ProtectedRoute()
        {
            return Ok("You have accessed a protected route!");
        }

        public class UserSignupRequest
        {
            [Required]
            [StringLength(100)]
            public string Name { get; set; } = string.Empty;

            [Required]
            [EmailAddress]
            public string Email { get; set; } = string.Empty;

            [Required]
            [Phone]
            public string Phone { get; set; } = string.Empty;

            [Required]
            [MinLength(8)]
            public string Password { get; set; } = string.Empty;
        }

        public class UserLoginRequest
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; } = string.Empty;

            [Required]
            public string Password { get; set; } = string.Empty;
        }


    }
}
