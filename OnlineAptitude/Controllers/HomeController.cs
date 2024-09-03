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
                    // Assuming user has an ImagePath property
                    newuser.Registration.UserImage = Path.Combine("myfiles", fileName);
                }
                db.Users.Add(newuser.Registration);
                db.SaveChanges();
                return RedirectToAction("signin");
            }
        //END REGISTRATION
        [HttpGet]
        public IActionResult Signin()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Signin(User userAuth)
        {
            var findUser = db.Users.Include(options => options.RoleIdFk).Where(options => options.Username == userAuth.Username && options.Password == userAuth.Password).ToList();
            if (findUser != null)
            {
                var userRole = findUser[0].Roles.RoleName;
                if (userRole == "Admin")
                {
                    var userrole = "Admin";
                    Contx.HttpContext.Session.SetString("Name", findUser[0].UserName);
                    Contx.HttpContext.Session.SetString("Email", findUser[0].Email);
                    Contx.HttpContext.Session.SetString("Password", findUser[0].Password);
                    Contx.HttpContext.Session.SetString("userimg", findUser[0].UserImage);
                    Contx.HttpContext.Session.SetString("userrole", userrole);
                    return RedirectToAction("Index", "Dashboard");
                }
                else if (userRole == "User")
                {
                    var userrole = "User";
                    Contx.HttpContext.Session.SetString("Name", findUser[0].UserName);
                    Contx.HttpContext.Session.SetString("Email", findUser[0].Email);
                    Contx.HttpContext.Session.SetString("Password", findUser[0].Password);
                    Contx.HttpContext.Session.SetString("userimg", findUser[0].UserImage);
                    Contx.HttpContext.Session.SetString("userrole", userrole);
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    // Handle unrecognized role
                    return RedirectToAction("Registration", "Signup");
                }
            }
            return View();
        }
        public IActionResult Logout()
        {
            Contx.HttpContext.Session.Clear();
            return RedirectToAction("Login", "signup");
        }
























        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
