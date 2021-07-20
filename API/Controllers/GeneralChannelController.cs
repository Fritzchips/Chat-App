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
        public ActionResult Index()
        {
            IList<User> users;

            using (ISession session = NhibernateSession.OpenSession())  
            {
                users = session.Query<User>().ToList(); 
            }

            return Ok("you have");
        }

        [HttpPost]
        public ActionResult Create()
        {
            try
            {
                User user = new User();     
                user.Name = "scott";
                user.Password = "cool";

          
                using (ISession session = NhibernateSession.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())  
                    {
                        session.Save(user); 
                        transaction.Commit();   
                    }
                }
                return Ok("created");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
