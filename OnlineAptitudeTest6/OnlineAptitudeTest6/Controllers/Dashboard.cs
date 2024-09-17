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

        [HttpGet]
        public IActionResult QuestionAdd()
        {
            QuestionAddViewModel add = new QuestionAddViewModel
            {
                Testlist = db.Tests.ToList(),
                Question = new Question()
            };

            return View(add);

        }
        [HttpPost]
        public IActionResult QuestionAdd(QuestionAddViewModel add)
        {
            db.Questions.Add(add.Question);
            db.SaveChanges();
            return RedirectToAction("Questionshow");
        }
        [HttpGet]
        //Questionshow Work
        public IActionResult Questionshow()
        {
            var show = db.Questions.ToList();
            return View(show);
        }
        //Edit Work Question
        public IActionResult Edit(int id)
        {
            QuestionAddViewModel editform = new QuestionAddViewModel
            {
                Testlist = db.Tests.ToList(),
                Question = new Question()
            };
            return View(editform);
        }
        [HttpPost]
        public IActionResult Edit(QuestionAddViewModel nayadata, int id)
        {
            var puranadata = db.Questions.Find(id);

            puranadata.QuestionText = nayadata.Question.QuestionText;
            puranadata.OptionA = nayadata.Question.OptionA;
            puranadata.OptionB = nayadata.Question.OptionB;
            puranadata.OptionC = nayadata.Question.OptionC;
            puranadata.OptionD = nayadata.Question.OptionD;
            puranadata.CorrectOption = nayadata.Question.CorrectOption;
            puranadata.Marks = nayadata.Question.Marks;
            db.SaveChanges();
            return RedirectToAction("Questionshow");
        }
        
















        //public async Task<IActionResult> Edit(int id)
        //{
        //    var dataa = await db.Questions.FindAsync(id);
        //    if (dataa == null)
        //    {
        //        return NotFound();
        //    }
        //    return View(dataa);
        //}
        //[HttpPost]
        //public async Task<IActionResult> Edit(Question q)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        db.Questions.Update(q);
        //        db.SaveChanges();
        //        return RedirectToAction("Questionshow");
        //    }
        //    return View();
        //}
















    }
}
