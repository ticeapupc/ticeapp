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

        public IActionResult Tarea(int codigoCurso, int codigoActividad)
        {
            ViewData["Message"] = "Your application description page.";
            ViewData["menu"] = "curso";
            ViewData["codigoActividad"] = codigoActividad;
            ViewData["codigoCurso"] = codigoCurso;
            return View();
        }

        public IActionResult Actividad(int codigoCurso)
        {
            ViewData["Message"] = "Your contact page.";
            ViewData["menu"] = "curso";
            ViewData["codigoCurso"] = codigoCurso;
            return View();
        }
        public IActionResult Documento(int codigoCurso, int codigoActividad, int codigoTarea)
        {
            ViewData["menu"] = "curso";
            ViewData["Message"] = "Your contact page.";
            ViewData["codigoActividad"] = codigoActividad;
            ViewData["codigoCurso"] = codigoCurso;
            ViewData["codigoTarea"] = codigoTarea;
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

        public IActionResult EditarCapa(int codigoCapa)
        {
            ViewData["menu"] = "main";
            ViewData["codigoCapa"] = codigoCapa;
            return View("CrearCapa");
        }

        public IActionResult CrearCapa2(int codigoCapa)
        {
            ViewData["menu"] = "main";
            ViewData["codigoCapa"] = codigoCapa;
            return View();
        }

        public IActionResult CrearCapa3(int codigoCapa)
        {
            ViewData["menu"] = "main";
            ViewData["codigoCapa"] = codigoCapa;
            return View();
        }
        public IActionResult Error()
        {
            return View();
        }
    }
}
