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
        private readonly INhibernateHandler _nhibernateHandler;

        public LoginController(IJwtAuthenticationManager jwtAuthenticationManager, INhibernateHandler nhibernateHandler)
        {
            _jwtAuthenticationManager = jwtAuthenticationManager;
            _nhibernateHandler = nhibernateHandler;
        }

        //create user
        [Route("{action}/{name}/{password}")]
        public ActionResult signUp(string name, string password)
        {
            try
            {
                var clientStatus = _nhibernateHandler.CreateUser(name, password);
                return Ok(clientStatus);
            }
            catch (Exception)
            {

                return BadRequest("something went wrong signing up");
            }
        }

        //get single user
        [Route("{action}/{name}/{password}")]
        public ActionResult signIn(string name, string password)
        {
            try
            {
                var client = _nhibernateHandler.GetUser(name, password);
                return Ok(client);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        //creating jwt
        [Route("{action}/{name}/{userId}")]
        public ActionResult newToken(string name, string userId)
        {
           var token = _jwtAuthenticationManager.TokenCreation(name, userId);
            return Ok(token);
        }
    }
}
