using Microsoft.AspNetCore.Mvc;
using OnlineAptitude.Models;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;


namespace OnlineAptitude.Controllers
{
    public class HomeController : Controller
    {
        //Private Read Context File
        private readonly AptitudeTestContext db;

        private readonly ILogger<HomeController> _logger;
                public HomeController(ILogger<HomeController> logger, AptitudeTestContext db)
        {
            _logger = logger;
            this.db = db;
        }

        public IActionResult Index()
        {
            return View();
        }
        //ADD User

        [HttpGet]
        public IActionResult Registration()
        {
            RegistrationRoleViewModel regsForm = new RegistrationRoleViewModel
            {
                RoleList = db.Roles.ToList(),
                Registration = new User()
            };
            return View(regsForm);
        }
        [HttpPost]
        public IActionResult Registration(RegistrationRoleViewModel newuser, IFormFile file)
        {
            if (file != null && file.Length > 0)
            {

                var fileName = Path.GetFileName(file.FileName);
                string imagesFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/myfiles");
                if (!Directory.Exists(imagesFolder))
                {
                    Directory.CreateDirectory(imagesFolder);
                }
                string filePath = Path.Combine(imagesFolder, fileName);
                using (var streamuser = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyToAsync(streamuser);
                }
                // Assuming ProductFk has an ImagePath property
                newuser.Registration.Userimage = Path.Combine("myfiles", fileName);
            }
            db.Users.Add(newuser.Registration);
            db.SaveChanges();
           return RedirectToAction("login");

        }







        public IActionResult Signin()
        {
            return View();
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
