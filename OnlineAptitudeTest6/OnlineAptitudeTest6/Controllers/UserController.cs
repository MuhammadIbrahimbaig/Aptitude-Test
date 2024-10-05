using Microsoft.AspNetCore.Mvc;
using OnlineAptitudeTest6.Models;

namespace OnlineAptitudeTest6.Controllers
{
    public class UserController : Controller
    {

        private readonly AptitudeTestContext db;
        private readonly IHttpContextAccessor Contx;
        private readonly ILogger<HomeController> _logger;
        public UserController(ILogger<HomeController> logger, AptitudeTestContext db, IHttpContextAccessor contx)
        {
            _logger = logger;
            this.db = db;
            this.Contx = contx;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult ApptitudeTest()
        {
            var QuestionWithTestViewModel = new QuestionWithTestViewModel
            {
                QuestionList = db.Questions.ToList(),
                TestList = db.Tests.ToList(),
              
            };


            return View(QuestionWithTestViewModel);
        }

        [HttpPost]
        [Route("User/SubmitTest")]
        public ActionResult Submit(IFormCollection form, Finalresult res)
        {
            int score = 0;
            int correctAnswersCount = 0;  // To count the number of correct answers

            // Loop through the questions and check answers
            foreach (var question in db.Questions.ToList())
            {
                string selectedOption = form["question_" + question.QuestionId];

                if (!string.IsNullOrEmpty(selectedOption) && selectedOption == question.CorrectOption)
                {
                    correctAnswersCount++;
                    score = 10 * correctAnswersCount;  // Assuming each correct answer gives 10 points
                }
            }

            // Prepare the result data to insert into the Results table

            res.UserId = Contx.HttpContext.Session.GetInt32("UserId");  // Assuming you have stored UserId in the session
            res.Score = score;  // Calculated score
            res.ResultStatus = score >= 50 ? "Pass" : "Fail"; // Assuming 50 is the passing score
      

            // Add result to the Results table
            db.Finalresults.Add(res);

            // Save changes to the database
            db.SaveChanges();

            // Redirect or return the appropriate view
            return RedirectToAction("ResultPage");  // Redirect to a result page (or appropriate view)
        }

        public IActionResult ResultPage()
        {
            var results = db.Finalresults.ToList();

            // Pass the results to the view
            return View(results);
        }

    }
}
