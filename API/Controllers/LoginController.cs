using Core;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using System;
using Newtonsoft.Json;

namespace API.Controllers
{
    public class LoginController : BaseApiController
    {
        private readonly INhibernateHandler _nhibernateHandler;

        public LoginController(INhibernateHandler nhibernateHandler)
        {
            _nhibernateHandler = nhibernateHandler;
        }

        //create user
        [HttpPost("{action}/{userInfo}")]
        public ActionResult SignUp(string userInfo)
        {
            var convertedUser = JsonConvert.DeserializeObject<User>(userInfo);
            _nhibernateHandler.CreateUser(convertedUser);
            return Ok(convertedUser.Name);

        }

        //get single user
        [HttpGet("{action}/{name}/{password}")]
        public ActionResult CheckUser(string name, string password)
        {
            try
            {
                var client = _nhibernateHandler.FindUser(name, password);
                return Ok(client);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [HttpGet("{action}/{name}/{password}")]
        public ActionResult SignIn(string name, string password)
        {
            User client = _nhibernateHandler.GetUserByString(name, password);
            return Ok(client);
        }

        
    }
}
