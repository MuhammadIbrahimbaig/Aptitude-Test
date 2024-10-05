using System;
using System.Collections.Generic;

namespace OnlineAptitudeTest6.Models
{
    public partial class Test
    {
        public Test()
        {
            Questions = new HashSet<Question>();
        }

        public int TestId { get; set; }
        public string? TestName { get; set; }
        public int? TotalQuestions { get; set; }
        public int? TotalMarks { get; set; }
        public int? TimeLimit { get; set; }

        public virtual ICollection<Question> Questions { get; set; }
    }
}
