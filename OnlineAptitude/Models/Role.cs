﻿using System;
using System.Collections.Generic;

namespace OnlineAptitude.Models;

public partial class Role
{
    public int RoleId { get; set; }

    public string? Rolename { get; set; }

    public virtual ICollection<User> Users { get; } = new List<User>();
}
