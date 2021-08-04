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
        private readonly IJwtAuthenticationManager _jwtAuthenticationManager;

        public LoginController(IJwtAuthenticationManager jwtAuthenticationManager)
        {
            _jwtAuthenticationManager = jwtAuthenticationManager;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UserCred userCred)
        {
            var token = _jwtAuthenticationManager.TokenCreation(userCred.Username, userCred.Password);
            if (token == null)
                return Unauthorized();
            return Ok(token);
        }


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
                using (ISession session = NhibernateSession.OpenSession())
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
                User client;
                using (ISession session = NhibernateSession.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                        var checkUser = session.Query<User>().Where(x => x.Name == name && x.Password == password).FirstOrDefault();
                        if (checkUser != null)
                        {                         
                            client = checkUser;
                            transaction.Commit();
                        }
                        else
                        {
                            transaction.Commit();
                            client = null;
                        }
                    }
                }
                return Ok(client);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [Route("{action}/{name}/{userId}")]
        public ActionResult newToken(string name, string userId)
        {
           var token = _jwtAuthenticationManager.TokenCreation(name, userId);
            return Ok(token);
        }
    }
}
