using System.Diagnostics.CodeAnalysis;
using JPSportsApi.Infrastructure.Persistence.Entities;
using Microsoft.EntityFrameworkCore;

namespace JPSportsApi.Infrastructure.Persistence;

// IL2026/IL3050: DbContext base constructor is annotated as not AOT-safe in the general case.
// Safe here because we use a compiled model (dotnet ef dbcontext optimize) which bypasses
// all reflection-based model building at runtime.
[SuppressMessage("Trimming", "IL2026")]
[SuppressMessage("AOT", "IL3050")]
public class JPSportsDbContext(DbContextOptions<JPSportsDbContext> options)
    : DbContext(options)
{
    public DbSet<Team> Teams => Set<Team>();

    // Only used by `dotnet ef migrations` — bypassed at runtime when UseModel() is called.
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Team>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired();
            entity.Property(e => e.City).IsRequired();
        });
    }
}
