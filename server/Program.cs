using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
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
                var jwtConfig = configuration.GetSection("JwtConfig").Get<JwtConfig>();
                var key = Encoding.ASCII.GetBytes(jwtConfig.Secret);

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var token = context.Request.Headers["Authorization"].FirstOrDefault();

                        if (!string.IsNullOrEmpty(token))
                        {
                            // Remove 'Bearer ' prefix if present
                            if (token.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                            {
                                token = token.Substring("Bearer ".Length).Trim();
                            }

                            // Set the token for further processing
                            context.Token = token;
                        }

                        return Task.CompletedTask;
                    },
                    OnAuthenticationFailed = context =>
                    {
                        var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Program>>();
                        logger.LogError($"Authentication failed: {context.Exception.Message}");
                        return Task.CompletedTask;
                    }
                };
            });

            // Add CORS policy to allow any origin, method, and header (adjust for production for better security)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.WithOrigins("http://localhost:4200", "https://localhost:7147")
                                      .AllowAnyMethod()
                                      .AllowAnyHeader());
            });

            // Optionally configure Swagger for API documentation
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });

                // Add JWT Authentication
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token.",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
                });
            });


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
            else
            {
                // In production, use the exception handler
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }


            // Enforce HTTPS redirection
            app.UseHttpsRedirection();

            // Serve static files (if any)
            app.UseStaticFiles();

            // Add routing middleware
            app.UseRouting();

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
