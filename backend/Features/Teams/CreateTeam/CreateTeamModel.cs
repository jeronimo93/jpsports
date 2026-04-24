using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Features.Teams.CreateTeam;

[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicProperties)]
public record CreateTeamModel(
    [Required, StringLength(100, MinimumLength = 3)] string Name,
    [Required, StringLength(100)] string City)
{
    public Dictionary<string, string[]> Validate()
    {
        var errors = new Dictionary<string, string[]>();
        if (string.IsNullOrWhiteSpace(Name)) errors.Add(nameof(Name), ["Name is required."]);
        if (string.IsNullOrWhiteSpace(City)) errors.Add(nameof(City), ["City is required."]);
        return errors;
    }
};