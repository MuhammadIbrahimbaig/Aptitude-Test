using System;
using System.Collections.Generic;

namespace OnlineAptitudeTest6.Models
{
    public partial class User
    {
        public User()
        {
            Finalresults = new HashSet<Finalresult>();
        }

        public int UserId { get; set; }
        public string? Username { get; set; }
        public string Password { get; set; } = null!;
        public int? RoleIdFk { get; set; }
        public string? PersonalDetails { get; set; }
        public string? EducationDetails { get; set; }
        public string? WorkExperience { get; set; }
        public string? UserImage { get; set; }

        public virtual Role? RoleIdFkNavigation { get; set; }
        public virtual ICollection<Finalresult> Finalresults { get; set; }
    }
}
