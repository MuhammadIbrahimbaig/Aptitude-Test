using System;
using System.Collections.Generic;

namespace OnlineAptitude.Models;

public partial class Test
{
    public int TestId { get; set; }

    public string? TestName { get; set; }

    public int? TotalQuestions { get; set; }

    public int? TotalMarks { get; set; }

    public int? TimeLimit { get; set; }

    public virtual ICollection<Question> Questions { get; } = new List<Question>();

    public virtual ICollection<Result> Results { get; } = new List<Result>();
}
