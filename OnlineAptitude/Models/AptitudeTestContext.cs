using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace OnlineAptitude.Models;

public partial class AptitudeTestContext : DbContext
{
    public AptitudeTestContext()
    {
    }

    public AptitudeTestContext(DbContextOptions<AptitudeTestContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<Result> Results { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Test> Tests { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

        => optionsBuilder.UseSqlServer();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.QuestionId).HasName("PK__Question__0DC06FAC46481629");

            entity.Property(e => e.CorrectOption)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.OptionA)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.OptionB)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.OptionC)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.OptionD)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.QuestionText)
                .HasMaxLength(250)
                .IsUnicode(false);

            entity.HasOne(d => d.Test).WithMany(p => p.Questions)
                .HasForeignKey(d => d.TestId)
                .HasConstraintName("FK__Questions__TestI__5629CD9C");
        });

        modelBuilder.Entity<Result>(entity =>
        {
            entity.HasKey(e => e.ResultId).HasName("PK__Results__976902084C6E8191");

            entity.Property(e => e.ResultStatus)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Test).WithMany(p => p.Results)
                .HasForeignKey(d => d.TestId)
                .HasConstraintName("FK__Results__TestId__59FA5E80");

            entity.HasOne(d => d.User).WithMany(p => p.Results)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Results__UserId__59063A47");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Roles__8AFACE1A7C6E9871");

            entity.Property(e => e.Rolename)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Test>(entity =>
        {
            entity.HasKey(e => e.TestId).HasName("PK__Tests__8CC331601636EF4F");

            entity.Property(e => e.TestName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__users__1788CC4C291979EC");

            entity.ToTable("users");

            entity.Property(e => e.EducationDetails)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PersonalDetails)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.RoleIdFk).HasColumnName("RoleIdFK");
            entity.Property(e => e.Userimage).HasColumnName("userimage");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.WorkExperience)
                .HasMaxLength(250)
                .IsUnicode(false);

            entity.HasOne(d => d.RoleIdFkNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleIdFk)
                .HasConstraintName("FK__users__RoleIdFK__4E88ABD4");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
