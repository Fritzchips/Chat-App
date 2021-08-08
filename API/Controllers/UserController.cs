using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Core;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly INhibernateHandler _nhibernateHandler;

        public UserController(INhibernateHandler nhibernateHandler)
        {
            _nhibernateHandler = nhibernateHandler;
        }
        //get single user
        [Route("{action}/{id}")]
        public ActionResult GetUser(Guid id)
        {
            var client = _nhibernateHandler.GetUserById(id);
            return Ok(client);
        }

        //update user
        [Route("{action}/{type}/{user}")]
        public ActionResult UpdateUser(string type, string user)
        {
            var newUser = JsonConvert.DeserializeObject<User>(user);
            _nhibernateHandler.UpdateUser(type, newUser);
            return Ok();
        }
    }
}
