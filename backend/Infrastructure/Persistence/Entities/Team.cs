namespace JPSportsApi.Infrastructure.Persistence.Entities;

public class Team
{
    public required Guid Id { get; init; }
    public required string Name
    {
        get => field;
        set => field = string.IsNullOrWhiteSpace(value)
            ? throw new ArgumentException("Name cannot be empty")
            : value.Trim();
    }
    public required string City { get; set; }
    public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
}