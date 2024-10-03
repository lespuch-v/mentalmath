using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Repositories;
using System.Text;

namespace server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Create the builder for the application
            var builder = WebApplication.CreateBuilder(args);

            // Access the configuration object (appsettings.json)
            var configuration = builder.Configuration;

            // Add services to the container

            // Register controllers to the DI container
            builder.Services.AddControllers();

            // Configure Entity Framework Core with SQL Server using the connection string from appsettings.json
            builder.Services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            // Register the user repository interface with its implementation
            builder.Services.AddScoped<IUserRepository, UserRepository>();

            // Configure AutoMapper to scan the current assembly
            builder.Services.AddAutoMapper(typeof(Program));

            // Configure JWT authentication settings
            var jwtConfig = configuration.GetSection("JwtConfig").Get<JwtConfig>();
            if (jwtConfig == null)
            {
                throw new InvalidOperationException("JWT configuration is missing. Ensure 'JwtConfig' section is defined in appsettings.json.");
            }
            var key = Encoding.ASCII.GetBytes(jwtConfig.Secret);

            // Register the JWT configuration as an injectable service
            builder.Services.Configure<JwtConfig>(configuration.GetSection("JwtConfig"));

            // Set up authentication with JWT Bearer tokens
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false; // Set to true in production for better security
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = jwtConfig.Issuer,
                    ValidAudience = jwtConfig.Audience,
                    ClockSkew = TimeSpan.Zero // Reduce delay for token expiration, useful for immediate effect on expiry
                };
            });

            // Add CORS policy to allow any origin, method, and header (adjust for production for better security)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.WithOrigins("http://localhost:4200/")
                                      .AllowAnyMethod()
                                      .AllowAnyHeader());
            });

            // Optionally configure Swagger for API documentation
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Build the application
            var app = builder.Build();

            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                // Show detailed error information in the developer environment
                app.UseDeveloperExceptionPage();

                // Enable Swagger UI only in development
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"));
            }

            // Enforce HTTPS redirection
            app.UseHttpsRedirection();

            // Use the defined CORS policy
            app.UseCors("CorsPolicy");

            // Enable authentication and authorization middleware
            app.UseAuthentication();
            app.UseAuthorization();

            // Map controller routes to endpoints
            app.MapControllers();

            // Run the application
            app.Run();
        }
    }
}
