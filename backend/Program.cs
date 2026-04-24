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
    options.ApiVersionReader = new UrlSegmentApiVersionReader();
    options.DefaultApiVersion = new ApiVersion(1, 0);
});

var app = builder.Build();

app.MapTeamsEndpoints();

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();

[JsonSerializable(typeof(TeamResponse))]
[JsonSerializable(typeof(List<TeamResponse>))]
public partial class AppJsonContext : JsonSerializerContext { }
