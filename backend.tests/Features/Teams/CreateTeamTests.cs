
using Features.Teams.CreateTeam;
using FluentAssertions;
using Xunit;

namespace JPSportsApi.Features.Teams.CreateTeam;

public class CreateTeamTests
{
    [Fact]
    public async Task CreateTeam_ReturnsTeam_WhenModelIsValid()
    {
        // Arrange
        var model = new CreateTeamModel("Team B", "City B");
        var expectedTeam = new TeamResponse(1, "Team B", "City B");

        // Act
        var actualTeam = await CreateTeamEndpoint.HandleAsync(model);

        // Assert
        actualTeam.Value.Should().BeEquivalentTo(expectedTeam);
    }

    [Fact]
    public async Task CreateTeam_ReturnsFailure_WhenModelIsInvalid()
    {
        // Arrange
        var model = new CreateTeamModel("", "City B");
        var expectedError = "Name is required";

        // Act
        var actualTeam = await CreateTeamEndpoint.HandleAsync(model);

        // Assert
        actualTeam.Error.Should().Contain(expectedError);
    }

    [Fact]
    public async Task CreateTeam_ReturnsSuccess_WhenModelIsValid()
    {
        // Arrange
        var model = new CreateTeamModel("Team C", "City C");

        // Act
        var result = await CreateTeamEndpoint.HandleAsync(model);

        // Assert
        result.IsSuccess.Should().BeTrue();
    }
}
