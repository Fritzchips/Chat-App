using Core;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NHibernate;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    //[Authorize]
    public class LoginController : BaseApiController
    {
        //private readonly IJwtAuthenticationManager jwtAuthenticationManager;

        //public LoginController(IJwtAuthenticationManager jwtAuthenticationManager)
        //{
        //    this.jwtAuthenticationManager = jwtAuthenticationManager;
        //}

        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "john", "doe" };
        //}




        //[AllowAnonymous]
        //[HttpPost("authenticate")]
        //public IActionResult Authenticate([FromBody] UserCred userCred)
        //{
        //    var token = jwtAuthenticationManager.Authenticate(userCred.Username, userCred.Password);
        //    if (token == null)
        //        return Unauthorized();
        //    return Ok(token);
        //}

        //[HttpGet("/{action}/{method}/{name}/{password}")]
        //public IActionResult veryifyUser(string method, string name, string password)
        //{
        //    var newUser;
        //    using (ISession session = UserSession.OpenSession())
        //    {
        //        using (ITransaction transaction = session.BeginTransaction())
        //        {


        //            var checkUser = session.Query<User>().Where(x => x.Name == name && x.Password == password).ToList();
        //            newUser = checkUser;

        //            transaction.Commit();
        //        }
        //    }
        //    if (newUser)
        //        return Ok("user is already in the database");


        //    return Redirect($"/{method}/{name}/{password}");
        //}

        [Route("{action}/{name}/{password}")]
        public ActionResult signUp(string name, string password)
        {
            try
            {
                string words;
                User person = new User()
                {
                    Name = name,
                    Password = password
                };
                using (ISession session = UserSession.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                        var checkPerson = session.Query<User>().Where(x => x.Name == name && x.Password == password).ToList();
                        if(checkPerson.Count < 1)
                        {
                            session.Save(person);
                            transaction.Commit();
                            words = "saved the person";
                        } else
                        {
                            transaction.Commit();
                            words = "user already exist";
                        }
                    }
                }
                return Ok(words);
            }
            catch (Exception)
            {

                return BadRequest("something went wrong signing up");
            }
        }


        [Route("{action}/{name}/{password}")]
        public ActionResult signIn(string name, string password)
        {
            try
            {
                string person;
                using (ISession session = UserSession.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                        var checkUser = session.Query<User>().Where(x => x.Name == name && x.Password == password).ToList();
                        if (checkUser.Count > 0)
                        {
                            person = "user exist";
                            transaction.Commit();

                        } else
                        {
                            person = "user doesn't exist";
                            transaction.Commit();
                        }
                    }
                }
                return Ok($"here is the User data {person}");
            }
            catch (Exception)
            {
                return BadRequest("Sorry Can't find user");
            }
            
        }
    }
}
