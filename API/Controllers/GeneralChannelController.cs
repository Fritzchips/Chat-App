using Microsoft.AspNetCore.Mvc;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core;
using Infrastructure;

namespace API.Controllers
{
   
    public class GeneralChannelController : BaseApiController
    {
        // /generalchannel
        public ActionResult Index()
        {
            try
            {
                var person = new User()
                {
                    Name = "George",
                    Password = "Jungle"
                };

                using (ISession session = NhibernateSession.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())   //  Begin a transaction
                    {
                        session.Save(person); //  Save the person in session
                        transaction.Commit();   //  Commit the changes to the database
                    }

                }

                return Ok("completed");
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }

        }


       

        //[Route("/Name")]
        //[Route("/Name/{id?}")]
        //Endpoints 
        //Actions return View or Json Data
        //Try [Fromheader] parameter
        //try [FromBody]

        //return Json({})
        //return content()


    }

   
}
