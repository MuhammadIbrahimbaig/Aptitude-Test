using System;
using System.Collections.Generic;

namespace OnlineAptitude.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? Username { get; set; }

    public string Password { get; set; } = null!;

    public int? RoleIdFk { get; set; }

    public string? PersonalDetails { get; set; }

    public string? EducationDetails { get; set; }

    public string? WorkExperience { get; set; }

    public string? UserImage { get; set; }

    public virtual ICollection<Result> Results { get; } = new List<Result>();

    public virtual Role? RoleIdFkNavigation { get; set; }
}
