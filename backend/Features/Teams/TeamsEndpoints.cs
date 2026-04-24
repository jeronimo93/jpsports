using Asp.Versioning;
using JPSportsApi.Features.Teams.GetTeamById;

namespace JPSportsApi.Features.Teams;

public static class TeamsEndpoints
{
    public static IEndpointRouteBuilder MapTeamsEndpoints(this IEndpointRouteBuilder app)
    {
        var versions = app.NewApiVersionSet()
            .HasApiVersion(new ApiVersion(1, 0))
            .Build();

        var v1 = app.MapGroup("teams")
            .WithTags("Teams")
            .WithApiVersionSet(versions);

        GetTeamByIdEndpoint.Map(v1);

        return app;
    }
}
