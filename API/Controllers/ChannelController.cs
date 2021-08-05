using Core;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace API.Controllers
{
    [Authorize]
    public class ChannelController : BaseApiController
    {
        private readonly INhibernateHandler _nhibernateHandler;

        public ChannelController(INhibernateHandler nhibernateHandler)
        {
            _nhibernateHandler = nhibernateHandler;
        }
        
        [Route("{action}/{name}")]
        public ActionResult GetChannel(string name)
        {
            try
            {
                var channelData = _nhibernateHandler.GetChannel(name);
                return Ok(channelData);
            }
            catch (Exception)
            {
                return BadRequest("didnt work");
            }
        }
    }
}
