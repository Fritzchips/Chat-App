﻿using Core;
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
    public class UserController : BaseApiController
    {
        // api/user/getchannel/general
        //Getting single channel by name and returning object
        [Authorize]
        [Route("{action}/{name}")]
        public ActionResult GetChannel(string name)
        {
            Channel channelData;
            try
            {
                using (ISession session = NhibernateSession.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                        var channel = session.Query<Channel>().Where(x =>x.Name == name).FirstOrDefault();
                        
                        transaction.Commit();
                        channelData = channel;
                    }
                }
                return Ok(channelData);
            }
            catch (Exception)
            {
                return BadRequest("didnt work");
            }
        }
    }
}
