using FluentAssertions;
using JPSportsApi.Features.Teams.GetTeamById;
using Xunit;

namespace JPSportsApi.Tests.Features.Teams;

public class GetTeamByIdTests
{
    [Fact]
    public async Task GetTeamById_ReturnsTeam_WhenTeamExists()
    {
        // Arrange
        var id = 1;
        var expectedTeam = new TeamResponse(1, "Team A", "City A");

        // Act
        var actualTeam = await GetTeamByIdEndpoint.HandleAsync(id);

        // Assert
        actualTeam.Value.Should().BeEquivalentTo(expectedTeam);
    }

    [Fact]
    public async Task GetTeamById_ReturnsFailure_WhenTeamDoesNotExist()
    {
        // Arrange
        var id = 999;
        var expectedError = "Team not found";

        // Act
        var actualTeam = await GetTeamByIdEndpoint.HandleAsync(id);

        // Assert
        actualTeam.Error.Should().Be(expectedError);
    }
}