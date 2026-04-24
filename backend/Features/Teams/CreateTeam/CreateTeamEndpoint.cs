using Features.Teams.CreateTeam;
using JPSportsApi.Common;

namespace JPSportsApi.Features.Teams.CreateTeam;

public static class CreateTeamEndpoint
{
    public static void Map(RouteGroupBuilder group)
    {
        group.MapPost("/", async (CreateTeamModel model) =>
        {
            var result = await HandleAsync(model);
            return result.IsSuccess
                ? Results.Ok(result.Value)
                : Results.NotFound(result.Error);
        })
        .WithName("CreateTeam")
        .AddEndpointFilter(CreateTeamValidationFilter.Validate);
    }

    public static async Task<Result<TeamResponse>> HandleAsync(
        CreateTeamModel model)
    {
        var errors = model.Validate();
        if (errors.Count > 0)
            return Result<TeamResponse>.Failure(string.Join("; ", errors.SelectMany(e => e.Value)));
            
        return Result<TeamResponse>.Success(new TeamResponse(
            1,
            model.Name,
            model.City));
    }
}

public static class CreateTeamValidationFilter
{
    public static async ValueTask<object?> Validate(
        EndpointFilterInvocationContext context,
        EndpointFilterDelegate next)
    {
        var input = context.GetArgument<CreateTeamModel>(0);
        var errors = new Dictionary<string, string[]>();

        if (string.IsNullOrWhiteSpace(input.Name))
            errors.Add(nameof(input.Name), ["Name is required."]);

        if (string.IsNullOrWhiteSpace(input.City))
            errors.Add(nameof(input.City), ["City is required."]);

        return await next(context);
    }
}
