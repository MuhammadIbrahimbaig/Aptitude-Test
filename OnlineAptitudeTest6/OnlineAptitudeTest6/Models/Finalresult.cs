using System;
using System.Collections.Generic;

namespace OnlineAptitudeTest6.Models
{
    public partial class Finalresult
    {
        public int ResultId { get; set; }
        public int? UserId { get; set; }
        public int? Score { get; set; }
        public string? ResultStatus { get; set; }

        public virtual User? User { get; set; }
    }
}
