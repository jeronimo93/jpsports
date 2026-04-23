using Asp.Versioning;
using JPSportsApi.Features.Teams.GetTeamById;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApiVersioning(options =>
{
    options.ApiVersionReader = new UrlSegmentApiVersionReader();
    options.DefaultApiVersion = new ApiVersion(1, 0);
});

var app = builder.Build();

// Register services and endpoints
app.MapGetTeamByIdEndpoint();

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();