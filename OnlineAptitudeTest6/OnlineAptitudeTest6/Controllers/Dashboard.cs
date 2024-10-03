using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
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
        //public IActionResult Profile(int id)
        //{
        //    RegistrationRoleViewModel updateuser = new RegistrationRoleViewModel
        //    {
        //        RoleList = db.Roles.ToList(),
        //        Registration = new User()
        //    };
        //    return View(updateuser);

        //}
        //[HttpPost]
        //public IActionResult Edit(RegistrationRoleViewModel Newdata, int id, IFormFile newimg)
        //{
        //    var Olddata = db.Users.Find(id);
        //    if (newimg != null && newimg.Length > 0)
        //    {
        //        // GETTING IMAGE FILE EXTENSION 
        //        var fileExt = System.IO.Path.GetExtension(newimg.FileName).Substring(1);
        //        // GETTING IMAGE NAME
        //        var random = Path.GetFileName(newimg.FileName);
        //        // GUID ID COMBINE WITH IMAGE NAME - TO ESCAPE IMAGE NAME REDENDNCY 
        //        var Filename = Guid.NewGuid() + random;
        //        // GET PATH OF CUSTOM IMAGE FOLDER
        //        string imgfolder = Path.Combine(HttpContext.Request.PathBase.Value, "wwwroot/myfiles");
        //        // CHECKING FOLDER EXIST OR NOT - IF NOT THEN CREATE F0LDER 
        //        if (!Directory.Exists(imgfolder))
        //        {
        //            Directory.CreateDirectory(imgfolder);
        //        }
        //        // MAKING CUSTOM AND COMBINE FOLDER PATH WITH IMAGE 
        //        string filepath = Path.Combine(imgfolder, Filename);
        //        // COPY IMAGE TO REAL PATH TO DEVELOPER PATH
        //        using (var stream = new FileStream(filepath, FileMode.Create))
        //        {
        //            newimg.CopyTo(stream);
        //        }
        //        // READY SEND PATH TO  IMAGE TO DB  
        //        var dbAddress = Path.Combine("myfiles", Filename);

        //        Newdata.Registration.UserImage = dbAddress;

        //        Olddata.Username = Newdata.Registration.Username;
        //        Olddata.Password = Newdata.Registration.Password;
        //        Olddata.PersonalDetails = Newdata.Registration.PersonalDetails;
        //        Olddata.EducationDetails = Newdata.Registration.EducationDetails;
        //        Olddata.WorkExperience = Newdata.Registration.WorkExperience;

        //        Olddata.UserImage = dbAddress;
        //        db.SaveChanges();
        //        return RedirectToAction("Usershow");

        //    }
        //    return View();
        //}

        //ChatGpt
        // Inject UserManager<ApplicationUser> to manage users
        //private readonly UserManager<OnlineAptitudeTest6> _userManager;

        //public Dashboard(UserManager<ApplicationUser> userManager)
        //{
        //    _userManager = userManager;
        //}

        //// GET: Profile (without passing ID)
        //public async Task<IActionResult> Profile()
        //{
        //    // Get the logged-in user
        //    var user = await _userManager.GetUserAsync(User);

        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    // Populate the ViewModel with the user's data
        //    var updateUser = new RegistrationRoleViewModel
        //    {
        //        RoleList = db.Roles.ToList(),
        //        Registration = new User
        //        {
        //            Username = user.UserName,
        //            PersonalDetails = user.PersonalDetails,
        //            EducationDetails = user.EducationDetails,
        //            WorkExperience = user.WorkExperience,
        //            UserImage = user.UserImage
        //        }
        //    };

        //    return View(updateUser);
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

























    }
}
