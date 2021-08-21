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

        [HttpGet("{action}/{id}")]
        public ActionResult GetUser(Guid id)
        {
            var client = _nhibernateHandler.GetUserById(id);
            return Ok(client);
        }

        [HttpPost("{action}/{type}/{user}")]
        public ActionResult UpdateUser(string type, string user)
        {
            var userInfo = JsonConvert.DeserializeObject<User>(user);
            _nhibernateHandler.UpdateUser(type, userInfo);
            return Ok();
        }
    }
}
