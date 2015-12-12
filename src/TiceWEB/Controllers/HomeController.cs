using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

namespace TiceWEB.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Tarea()
        {
            ViewData["Message"] = "Your application description page.";
            ViewData["menu"] = "curso";
            return View();
        }

        public IActionResult Actividad()
        {
            ViewData["Message"] = "Your contact page.";
            ViewData["menu"] = "curso";
            return View();
        }
        public IActionResult Documento()
        {
            ViewData["menu"] = "curso";
            ViewData["Message"] = "Your contact page.";
            return View();
        }

        public IActionResult Main()
        {
            ViewData["menu"] = "main";
            return View();
        }
        public IActionResult Curso()
        {
            ViewData["menu"] = "curso";
            return View();
        }

        public IActionResult CrearCapa()
        {
            ViewData["menu"] = "main";
            return View();
        }

        public IActionResult CrearCapa2()
        {
            ViewData["menu"] = "main";
            return View();
        }

        public IActionResult CrearCapa3()
        {
            ViewData["menu"] = "main";
            return View();
        }
        public IActionResult Error()
        {
            return View();
        }
    }
}
