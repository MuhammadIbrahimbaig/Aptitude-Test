using System;
using System.Collections.Generic;

namespace OnlineAptitude.Models;

public partial class Question
{
    public int QuestionId { get; set; }

    public int? TestId { get; set; }

    public string? QuestionText { get; set; }

    public string? OptionA { get; set; }

    public string? OptionB { get; set; }

    public string? OptionC { get; set; }

    public string? OptionD { get; set; }

    public string? CorrectOption { get; set; }

    public int? Marks { get; set; }

    public virtual Test? Test { get; set; }
}
