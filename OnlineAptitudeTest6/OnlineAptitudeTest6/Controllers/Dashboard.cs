using Microsoft.AspNetCore.Mvc;
using OnlineAptitudeTest6.Models;
namespace OnlineAptitudeTest6.Controllers
{
    public class Dashboard : Controller
    {
        //Private Read Context File
        private readonly AptitudeTestContext db;
        private readonly IHttpContextAccessor Contx;


        private readonly ILogger<Dashboard> _logger;
        public Dashboard(ILogger<Dashboard> logger, AptitudeTestContext db, IHttpContextAccessor contx)
        {
            _logger = logger;
            this.db = db;
            this.Contx = contx;
        }

        //[HttpGet]
        //public IActionResult QuestionAdd()
        //{


        //    QuestionAddViewModel add = new QuestionAddViewModel
        //    {
        //        Testlist = db.Tests.ToList(),
        //        Question = new Question()
        //    };
        //    db.Questions.Add(QuestionAddViewModel);
        //    db.SaveChanges();
        //    return RedirectToAction("Signin");
        //    //return View(add);
        //}
        [HttpGet]
        public IActionResult QuestionAdd()
        {
            return View();
        }
        [HttpPost]
        public IActionResult QuestionAdd(string Questionadd)
        {
            if (!string.IsNullOrEmpty(Questionadd))
            {
                var add = new Question { QuestionText = Questionadd , OptionA = Questionadd, OptionB = Questionadd, OptionC = Questionadd, OptionD = Questionadd, CorrectOption = Questionadd, Marks = CoQuestionadd};
                db.Questions.Add(add);
                db.SaveChanges();
            }
            return RedirectToAction("QuestionAdd");
        }



        public IActionResult QuestionShow()
        {
            return View();
        }
    }
}
