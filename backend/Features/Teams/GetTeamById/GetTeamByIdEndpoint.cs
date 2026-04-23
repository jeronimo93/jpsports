using JPSportsApi.Common;

namespace JPSportsApi.Features.Teams.GetTeamById;

public static class GetTeamByIdEndpoint
{
    public static IEndpointRouteBuilder MapGetTeamByIdEndpoint(
        this IEndpointRouteBuilder app)
    {
        var v1 = app.MapGroup("v1/teams")
            .WithTags("Teams");

        v1.MapGet("/{id:int}", async (int id) =>
        {
            var result = await HandleAsync(id);
            return result.IsSuccess
                ? Results.Ok(result.Value)
                : Results.NotFound(result.Error);
        }).WithName("GetTeamById");

        return app;
    }

    public static async Task<Result<TeamResponse>> HandleAsync(int id)
    {
        if (id != 1)
        {
            return Result<TeamResponse>.Failure("Team not found");
        }

        return Result<TeamResponse>.Success(new TeamResponse(1, "Team A", "City A"));
    }
}

public record TeamResponse(int Id, string Name, string City);
