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
using Newtonsoft.Json;

namespace API.Controllers
{
    //[Authorize]
    public class LoginController : BaseApiController
    {
        private readonly IJwtAuthenticationHandler _jwtAuthenticationManager;
        private readonly INhibernateHandler _nhibernateHandler;

        public LoginController(IJwtAuthenticationHandler jwtAuthenticationManager, INhibernateHandler nhibernateHandler)
        {
            _jwtAuthenticationManager = jwtAuthenticationManager;
            _nhibernateHandler = nhibernateHandler;
        }

        //create user
        [Route("{action}/{userInfo}")]
        public ActionResult SignUp(string userInfo)
        {
            var convertedUser = JsonConvert.DeserializeObject<User>(userInfo);
            _nhibernateHandler.CreateUser(convertedUser);
            return Ok(convertedUser.Name);

        }

        //get single user
        [Route("{action}/{name}/{password}")]
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

        [Route("{action}/{name}/{password}")]
        public ActionResult SignIn(string name, string password)
        {
            User client = _nhibernateHandler.GetUserByString(name, password);
            return Ok(client);
        }

        //creating jwt
        [Route("{action}/{name}/{userId}")]
        public ActionResult NewToken(string name, string userId)
        {
           var token = _jwtAuthenticationManager.TokenCreation(name, userId);
            return Ok(token);
        }

        [Route("{action}/{token}")]
        public bool TokenValidation(string token)
        {
            var value = _jwtAuthenticationManager.JwtValidation(token);
            return value;
        }
    }
}
