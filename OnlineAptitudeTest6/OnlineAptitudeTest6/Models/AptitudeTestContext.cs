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

        public virtual DbSet<Finalresult> Finalresults { get; set; } = null!;
        public virtual DbSet<Question> Questions { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Test> Tests { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=.;Initial Catalog=Aptitude Test;Persist Security Info=False;User ID=sa;Password=aptech;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("Latin1_General_CI_AS");

            modelBuilder.Entity<Finalresult>(entity =>
            {
                entity.HasKey(e => e.ResultId)
                    .HasName("PK__finalres__976902088E87C219");

                entity.ToTable("finalresult");

                entity.Property(e => e.ResultStatus)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Finalresults)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__finalresu__Resul__49C3F6B7");
            });

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
