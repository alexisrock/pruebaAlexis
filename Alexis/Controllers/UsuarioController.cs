using Alexis.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Alexis.Controllers
{
    public class UsuarioController : Controller
    {

        private readonly  pruebapagosenlineaEntities context = new pruebapagosenlineaEntities();

        // GET: Usuario
        public ActionResult Index()
        {
            return View();
        }



        public ActionResult Creacion_usuario() {

            return View();
        }
        [HttpPost]
        public ActionResult Creacion_usuario(Usuario usuario, HttpPostedFileBase imagenuser)
        {
            using (DbContextTransaction transac = context.Database.BeginTransaction()) {


                if (ModelState.IsValid != false)
                {

                    DateTime fecha = Convert.ToDateTime(usuario.fechaNacimineto);
                    string ruta = Cargarimagen(imagenuser);
                    usuario.fechaNacimineto = fecha;
                    usuario.url_foto = ruta;
                    context.Usuario.Add(usuario);
                    context.SaveChanges();

                   
                    transac.Commit();
                    ModelState.Clear();
                    TempData["Mensaje"] = "Usuario creado con exito";


                }
                else
                {
                    transac.Rollback();
                    TempData["Mensaje_error"] = "Datos incorrectos";

                }
            
            }


                return View();
        }


        public ActionResult gestion_usuario() {


            return View();
        }

        public string Cargarimagen(HttpPostedFileBase imagenuser)
            {

                string ruta = "";
                if (imagenuser != null && imagenuser.ContentLength > 0)
                {

                    string archivo = (DateTime.Now.ToString("yyyyMMddHHmmss") + "-" + imagenuser.FileName).ToLower();

                     ruta = "/Imagenes/" + archivo;

                    imagenuser.SaveAs(Server.MapPath("/Imagenes/" + archivo));

                }

                return ruta;
            }

        public JsonResult GetUsuarios()
        {
            var usuarios = context.Usuario.Select(x => new
            {
                x.id,
                documento = x.documento != null ? x.documento : "",
                nombres = x.nombres != null ? x.nombres : "",
                apellidos = x.apellidos != null ? x.apellidos : "",
                telefono = x.telefono != null ? x.telefono : "",
                direccion = x.direccion != null ? x.direccion : "",
                x.fechaNacimineto,
                url = x.url_foto != null ? x.url_foto : "",
            }).ToList();


            var ListaUsuario = usuarios.Select(x=> new {
                x.id,
                documento = x.documento != null ? x.documento : "",
                nombres = x.nombres != null ? x.nombres : "",
                apellidos = x.apellidos != null ? x.apellidos : "",
                telefono = x.telefono != null ? x.telefono : "",
                direccion = x.direccion != null ? x.direccion : "",
                fechaNacimineto =  x.fechaNacimineto != null ? x.fechaNacimineto.ToString() : "",
                url = x.url != null ? x.url : "",
            }).ToList();
            return Json(ListaUsuario);
        }

        public JsonResult GetUsuarioDocument(string documento)
        {
            var usuarios = context.Usuario.Where(x=>x.documento== documento).Select(x => new
            {
                x.id,
                documento = x.documento != null ? x.documento : "",
                nombres = x.nombres != null ? x.nombres : "",
                apellidos = x.apellidos != null ? x.apellidos : "",
                telefono = x.telefono != null ? x.telefono : "",
                direccion = x.direccion != null ? x.direccion : "",
                x.fechaNacimineto,
                url = x.url_foto != null ? x.url_foto : "",
            }).ToList();


            var ListaUsuario = usuarios.Select(x => new {
                x.id,
                documento = x.documento != null ? x.documento : "",
                nombres = x.nombres != null ? x.nombres : "",
                apellidos = x.apellidos != null ? x.apellidos : "",
                telefono = x.telefono != null ? x.telefono : "",
                direccion = x.direccion != null ? x.direccion : "",
                fechaNacimineto = x.fechaNacimineto != null ? x.fechaNacimineto.ToString() : "",
                url = x.url != null ? x.url : "",
            }).ToList();




            if (ListaUsuario.Count != 0)
            {
                return Json(ListaUsuario);
            }
            else {
                return Json(0);
            }



           
        }

        public JsonResult GetUsuario(int id)
        {
           
            var datos = context.Usuario.Where(x => x.id == id).Select(x => new
            {
                x.id,
                documento = x.documento != null ? x.documento : "",
                nombres = x.nombres != null ? x.nombres : "",
                apellidos = x.apellidos != null ? x.apellidos : "",
                telefono = x.telefono != null ? x.telefono : "",
                direccion = x.direccion != null ? x.direccion : "",
                fechaNacimineto = x.fechaNacimineto ,
                url = x.url_foto != null ? x.url_foto : "",
            }).ToList();

            var usuarios = datos.Select(x => new
            {
                x.id,
                x.documento,
                x.nombres,
                x.apellidos,
                x.direccion,
                x.telefono,
                fechaNacimineto = x.fechaNacimineto != null ? x.fechaNacimineto.Value.ToString("yyyy-MM-dd") : ""
            }).ToList();



            return Json(usuarios);
        }


        public JsonResult EliminarUsuario(int id)
        {

            Usuario user = context.Usuario.Where(x => x.id == id).FirstOrDefault();
            if (user != null)
            {
                context.Usuario.Remove(user);
                context.SaveChanges();
            }
            return Json(true);

        }


        public JsonResult GuardarInfoUsuario(int id, string documento, string nombres, string apellidos, string telefono, string Direccion, string fecha) {

            using (DbContextTransaction transac = context.Database.BeginTransaction())
            {
                Usuario user = context.Usuario.Where(x => x.id == id).FirstOrDefault();
                if (user != null)
                {
                    user.documento = documento;
                    user.nombres = nombres;
                    user.apellidos = apellidos;
                    user.direccion = Direccion;
                    user.telefono = telefono;
                    user.fechaNacimineto = Convert.ToDateTime(fecha);
                    context.Entry(user).State = EntityState.Modified;
                    context.SaveChanges();
                    transac.Commit();
                }
                else {
                    transac.Rollback();
                }

            }

            return Json(true);
        }


    }    
   
}