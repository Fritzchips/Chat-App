using Core;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        //Getting single channel by name and returning object
        [Route("{action}/{name}")]
        public ActionResult GetChannel(string name)
        {
            Channel channelData;
            try
            {
                using (ISession session = ChannelSession.OpenSession())
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

                return BadRequest("user not found");
            }
        }
    }
}
