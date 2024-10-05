using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineAptitudeTest6.Models;

namespace OnlineAptitudeTest6.Controllers
{
    public class HomeController : Controller
    {
        //Private Read Context File
        private readonly AptitudeTestContext db;
        private readonly IHttpContextAccessor Contx;


        private readonly ILogger<HomeController> _logger;
        public HomeController(ILogger<HomeController> logger, AptitudeTestContext db, IHttpContextAccessor contx)
        {
            _logger = logger;
            this.db = db;
            this.Contx = contx;
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
            return RedirectToAction("Signin");
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
            //var findUser = db.Users.Include(options => options.Role).Where(options => options.Username == userAuth.name && options.Password == userAuth.Password).ToList();
            var findUser = db.Users.Include(options => options.RoleIdFkNavigation).Where(options => options.Username == userAuth.Username && options.Password == userAuth.Password).ToList();


            if (findUser != null)
            {
              //  var userRole = findUser[0].Role.RoleName;
                var userRole = findUser[0].RoleIdFkNavigation.Rolename;

                if (userRole == "Manager")
                {
                    var userrole = "Manager";
                    Contx.HttpContext.Session.SetString("Name", findUser[0].Username);
                    Contx.HttpContext.Session.SetString("Password", findUser[0].Password);
                    Contx.HttpContext.Session.SetString("PersonalDetails", findUser[0].PersonalDetails);
                    Contx.HttpContext.Session.SetString("EducationDetails", findUser[0].EducationDetails);
                    Contx.HttpContext.Session.SetString("WorkExperience", findUser[0].WorkExperience);
                    Contx.HttpContext.Session.SetString("userimg", findUser[0].UserImage);
                    Contx.HttpContext.Session.SetString("userrole", userrole);
                    return RedirectToAction("Index", "Home");
                }
                else if (userRole == "Canditate")
                {
                    var userrole = "Canditate";
                    Contx.HttpContext.Session.SetInt32("UserId", findUser[0].UserId);
                    Contx.HttpContext.Session.SetString("Name", findUser[0].Username);
                    Contx.HttpContext.Session.SetString("Password", findUser[0].Password);
                    Contx.HttpContext.Session.SetString("PersonalDetails", findUser[0].PersonalDetails);
                    Contx.HttpContext.Session.SetString("EducationDetails", findUser[0].EducationDetails);
                    Contx.HttpContext.Session.SetString("WorkExperience", findUser[0].WorkExperience);
                    Contx.HttpContext.Session.SetString("userimg", findUser[0].UserImage);
                    Contx.HttpContext.Session.SetString("userrole", userrole);
                    return RedirectToAction("Index", "User");
                }
                else
                {
                    // Handle unrecognized role
                    return RedirectToAction("Registration", "Home");
                }
            }
            return View();
        }

        public IActionResult Logout()
        {
            Contx.HttpContext.Session.Clear();
            return RedirectToAction("Signin", "Home");
        }
        //Add Role work
        public IActionResult Role()
        {
            var Roleshow = db.Roles.ToList();

            return View(Roleshow);
        }
        public IActionResult RoleAdd()
        {
            return View();
        }
        [HttpPost]
        public IActionResult RoleAdd(string RoleName)
        {
            if (!string.IsNullOrEmpty(RoleName))
            {
                var newRole = new Role { Rolename = RoleName };
                db.Roles.Add(newRole);
                db.SaveChanges();
            }
            return RedirectToAction("Role");
        }
        ////start the Edit Work Get
        public async Task<IActionResult> Edit(int id)
        {
            var dataa = await db.Roles.FindAsync(id);
            if (dataa == null)
            {
                return NotFound();
            }
            return View(dataa);
        }
        //Http Post
        [HttpPost]
        public async Task<IActionResult> Edit(Role r)
        {
            if (ModelState.IsValid)
            {
                db.Roles.Update(r);
                db.SaveChanges();
                return RedirectToAction("Role");
            }
            return View();
        }
        ////Start The ROle Delete
        public async Task<IActionResult> Roledelete(int id)
        {
            var dlt = await db.Roles.FindAsync(id);
            if (dlt == null)
            {
                return NotFound();
            }
           db.Roles.Remove(dlt);
            await db.SaveChangesAsync();

            return RedirectToAction(nameof(Role));

        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}