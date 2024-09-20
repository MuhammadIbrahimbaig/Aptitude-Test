using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Differencing;

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

        public IActionResult Usershow()
        {
            var show = db.Users.ToList();

            return View(show);
        }

        public IActionResult userdelete(int id)
        {
            var dlt = id;
            var User = db.Users.FirstOrDefault(option => option.UserId == dlt);
            db.Users.Remove(User);
            db.SaveChanges();
            return RedirectToAction("Usershow");

        }
        //Edit profile

        public IActionResult Profile(int id)
        {

            var dataa = db.Users.Find(id);
            ViewBag.testt = db.Tests.ToList();
            if (dataa == null)
            {
                return NotFound();
            }
            return View(dataa);

        }

        //[HttpPost]
        //public async Task<IActionResult> Profile(Question qa)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        db.Users.Update(qa);
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }
        //    return View();
        //}

        //Add Question table work
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

            var dataa = db.Questions.Find(id);
            ViewBag.testt = db.Tests.ToList();
            if (dataa == null)
            {
                return NotFound();
            }
            return View(dataa);

        }

        [HttpPost]
        public async Task<IActionResult> Edit(Question q)
        {
            if (ModelState.IsValid)
            {
                db.Questions.Update(q);
                db.SaveChanges();
                return RedirectToAction("Questionshow");
            }
            return View();
        }




























    }
}
