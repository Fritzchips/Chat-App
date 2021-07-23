using Core;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        //post premade user
        [Route("{action}")]
        public ActionResult AnotherOne()
        {
            try
            {
                var person = new User()
                {
                    Name = "james",
                    Password = "Bond"
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

        //create user
        [Route("{action}")]
        public ActionResult CreateUser()
        {
            try
            {
                var person = new User()
                {
                    Name = "sora",
                    Password = "sky"
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
            catch (Exception)
            {
                return BadRequest("user already exist");
            }
        }


        //get single user
        [Route("{action}/{id}")]
        public ActionResult GetUser(Guid id)
        {
            User name = new User();
            try
            {
                using(ISession session = NhibernateSession.OpenSession())
                {
                    using(ITransaction transaction = session.BeginTransaction())
                    {
                        var person = session.Get<User>(id);
                        name = person;
                        
                        transaction.Commit();
                    }
                }
                return Ok(name);
            }
            catch (Exception)
            {

                return BadRequest("user not found");
            }
        }

        //get all users
        [Route("{action}/all")]
        public ActionResult FullTable()
        {
            try
            {
                List<User> userTable = new List<User>();

                using(ISession session = NhibernateSession.OpenSession())
                {
                    using(ITransaction transaction = session.BeginTransaction())
                    {
                        var dataCopy = session.Query<User>().ToList<User>();
                        userTable = dataCopy;
                        transaction.Commit();
                    }
                }

                return Ok(userTable);
            }
            catch (Exception)
            {

                return BadRequest("request was rejected");
            }
        }


        //get all messages from channel
        //create/post chat message
        
        
        
        
    }
}
