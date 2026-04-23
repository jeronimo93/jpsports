using Asp.Versioning;
using JPSportsApi.Features.Teams.GetTeamById;

namespace JPSportsApi.Features.Teams;

public static class TeamsEndpoints
{
    public static IEndpointRouteBuilder MapTeamsEndpoints(this IEndpointRouteBuilder app)
    {
        var v1 = app.MapGroup("v1/teams").WithTags("Teams");
        v1.HasApiVersion(new ApiVersion(1, 0));

        GetTeamByIdEndpoint.Map(v1);

        return app;
    }
}
