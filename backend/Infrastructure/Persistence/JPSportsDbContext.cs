using System.Diagnostics.CodeAnalysis;
using JPSportsApi.Infrastructure.Persistence.Entities;
using Microsoft.EntityFrameworkCore;

namespace JPSportsApi.Infrastructure.Persistence;

// [UnconditionalSuppressMessage] (not [SuppressMessage]) is required here because these are
// ILC/trimmer warnings, not Roslyn analyser warnings. The suppression is safe because we use
// a compiled model (dotnet ef dbcontext optimize) which bypasses all reflection-based model
// building at runtime — the only source of AOT unsafety in DbContext.
[UnconditionalSuppressMessage("Trimming", "IL2026")]
[UnconditionalSuppressMessage("AOT", "IL3050")]
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
