using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Differencing;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
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
        //DLt
        public IActionResult questdelete(int id)
        {
            var dlt = id;
            var Question = db.Questions.FirstOrDefault(option => option.QuestionId == dlt);
            db.Questions.Remove(Question);
            db.SaveChanges();
            return RedirectToAction("Questionshow");

        }
        //Test work 
        public IActionResult Testshow()
        {
            var showtest = db.Tests.ToList();
            return View(showtest);
        }
        //ADDTEST
        public IActionResult TestAdd()
        {
            TestAddViewModel add = new TestAddViewModel
            {
               // Testlist = db.Tests.ToList(),
                Testadding = new Test()
            };

            return View(add);

        }
        [HttpPost]
        public IActionResult TestAdd(TestAddViewModel add)
        {
            db.Tests.Add(add.Testadding);
            db.SaveChanges();
            return RedirectToAction("Testshow");
        }
        //Edit TEST
        [HttpGet]
         public IActionResult Edittest(int id)
        {
            var testing = db.Tests.Find(id);
            if (testing == null)
            {
                return NotFound();
            }
            return View(testing);

        }
        [HttpPost]
        public async Task<IActionResult> Edittest(Test t)
        {
            if (ModelState.IsValid)
            {
                db.Tests.Update(t);
                db.SaveChanges();
                return RedirectToAction("Testshow");
            }
            return View();
        }
        //delete TEST
       
        public IActionResult TestDlt(int id)
        {
            var test = id;
            var Testing = db.Tests.FirstOrDefault(option => option.TestId == test);
            db.Tests.Remove(Testing);
            db.SaveChanges();
            return RedirectToAction("Testshow");
        }

        //Result show
        [HttpGet]

        public IActionResult Resultshow()
        {
            var resultshow = db.Finalresults.ToList();

            return View(resultshow);
        }























    }
}
