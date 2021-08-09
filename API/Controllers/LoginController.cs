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

        [HttpGet("{action}/{name}/{password}")]
        public ActionResult ConfirmUser(string name, string password)
        {
            var client = _nhibernateHandler.ConfirmUser(name, password);
            return Ok(client);
        }

        [HttpPost("{action}/{userInfo}")]
        public ActionResult SignUp(string userInfo)
        {
            var convertedUser = JsonConvert.DeserializeObject<User>(userInfo);
            _nhibernateHandler.CreateUser(convertedUser);
            return Ok(convertedUser.Name);
        }

        [HttpGet("{action}/{name}/{password}")]
        public ActionResult SignIn(string name, string password)
        {
            User client = _nhibernateHandler.GetUserByString(name, password);
            return Ok(client);
        }
        
    }
}
