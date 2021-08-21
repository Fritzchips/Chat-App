﻿using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.AspNetCore.Authorization;

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
            var channelData = _nhibernateHandler.GetChannel(name);
            return Ok(channelData);
        }
    }
}
