using JPSportsApi.Common;
using JPSportsApi.Features.Teams;

namespace JPSportsApi.Features.Teams.GetTeamById;

public static class GetTeamByIdEndpoint
{
    public static void Map(RouteGroupBuilder group)
    {
        group.MapGet("/{id:int}", async (int id) =>
        {
            var result = await HandleAsync(id);
            return result.IsSuccess
                ? Results.Ok(result.Value)
                : Results.NotFound(result.Error);
        }).WithName("GetTeamById");
    }

    public static async Task<Result<TeamResponse>> HandleAsync(int id)
    {
        if (id != 1)
            return Result<TeamResponse>.Failure("Team not found");

        return Result<TeamResponse>.Success(new TeamResponse(1, "Team A", "City A"));
    }
}
