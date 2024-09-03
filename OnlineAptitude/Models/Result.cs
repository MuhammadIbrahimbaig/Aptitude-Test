using System;
using System.Collections.Generic;

namespace OnlineAptitude.Models;

public partial class Result
{
    public int ResultId { get; set; }

    public int? UserId { get; set; }

    public int? TestId { get; set; }

    public int? Score { get; set; }

    public string? ResultStatus { get; set; }

    public virtual Test? Test { get; set; }

    public virtual User? User { get; set; }
}
