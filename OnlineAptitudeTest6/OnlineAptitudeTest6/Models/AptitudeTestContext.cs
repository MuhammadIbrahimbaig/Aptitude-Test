using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace OnlineAptitudeTest6.Models
{
    public partial class AptitudeTestContext : DbContext
    {
        public AptitudeTestContext()
        {
        }

        public AptitudeTestContext(DbContextOptions<AptitudeTestContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Question> Questions { get; set; } = null!;
        public virtual DbSet<Result> Results { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Test> Tests { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer();
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("Latin1_General_CI_AS");

            modelBuilder.Entity<Question>(entity =>
            {
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

                entity.HasOne(d => d.Test)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.TestId)
                    .HasConstraintName("FK__Questions__TestI__2B3F6F97");
            });

            modelBuilder.Entity<Result>(entity =>
            {
                entity.Property(e => e.ResultStatus)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Test)
                    .WithMany(p => p.Results)
                    .HasForeignKey(d => d.TestId)
                    .HasConstraintName("FK__Results__TestId__2D27B809");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Results)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Results__UserId__2C3393D0");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Rolename)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Test>(entity =>
            {
                entity.Property(e => e.TestName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
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

                entity.Property(e => e.UserImage).HasMaxLength(255);

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.WorkExperience)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.RoleIdFkNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleIdFk)
                    .HasConstraintName("FK__users__RoleIdFK__2E1BDC42");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
