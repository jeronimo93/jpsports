using System.Text.Json.Serialization;
using Asp.Versioning;
using JPSportsApi.Features.Teams;
using JPSportsApi.Infrastructure.Persistence;
using JPSportsApi.Infrastructure.Persistence.CompiledModels;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolver = AppJsonContext.Default;
});

builder.Services.AddDbContext<JPSportsDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
    options.UseSqlite(connectionString);

    options.UseModel(JPSportsDbContextModel.Instance);
});

builder.Services.AddApiVersioning(options =>
{
    options.ApiVersionReader = ApiVersionReader.Combine(
        new QueryStringApiVersionReader("api-version"),
        new HeaderApiVersionReader("api-version")
    );
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
        policy.WithOrigins("http://localhost:8081")
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
    app.UseCors("DevCors");

app.MapTeamsEndpoints();

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();

[JsonSerializable(typeof(TeamResponse))]
[JsonSerializable(typeof(List<TeamResponse>))]
public partial class AppJsonContext : JsonSerializerContext { }
