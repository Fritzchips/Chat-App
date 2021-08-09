using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using System;
using Newtonsoft.Json;
using Core;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class UserController : BaseApiController
    {
        private readonly INhibernateHandler _nhibernateHandler;

        public UserController(INhibernateHandler nhibernateHandler)
        {
            _nhibernateHandler = nhibernateHandler;
        }
        //get single user
        [HttpGet("{action}/{id}")]
        public ActionResult GetUser(Guid id)
        {
            var client = _nhibernateHandler.GetUserById(id);
            return Ok(client);
        }

        //update user
        [HttpPost("{action}/{type}/{user}")]
        public ActionResult UpdateUser(string type, string user)
        {
            var newUser = JsonConvert.DeserializeObject<User>(user);
            _nhibernateHandler.UpdateUser(type, newUser);
            return Ok();
        }
    }
}
