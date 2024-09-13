using System;
using System.Collections.Generic;

namespace OnlineAptitudeTest6.Models
{
    public partial class Role
    {
        public Role()
        {
            Users = new HashSet<User>();
        }

        public int RoleId { get; set; }
        public string? Rolename { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
