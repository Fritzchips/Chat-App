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
        //post premade user
        [Route("{action}")]
        public ActionResult AnotherOne()
        {
            try
            {
                var person = new User()
                {
                    Name = "james",
                    Password = "Bond"
                };


                using (ISession session = UserSession.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())   //  Begin a transaction
                    {
                        session.Save(person); //  Save the person in session
                        transaction.Commit();   //  Commit the changes to the database
                    }

                }

                return Ok("completed");
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }

        }

        //create user
        [Route("{action}")]
        public ActionResult CreateUser()
        {
            try
            {
                var person = new User()
                {
                    Name = "sora",
                    Password = "sky"
                };

                using (ISession session = UserSession.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())   //  Begin a transaction
                    {
                        session.Save(person); //  Save the person in session
                        transaction.Commit();   //  Commit the changes to the database
                    }

                }

                return Ok("completed");
            }
            catch (Exception)
            {
                return BadRequest("user already exist");
            }
        }


        //get single user
        [Route("{action}/{id}")]
        public ActionResult GetUser(Guid id)
        {
            User name = new User();
            try
            {
                using(ISession session = UserSession.OpenSession())
                {
                    using(ITransaction transaction = session.BeginTransaction())
                    {
                        var person = session.Get<User>(id);
                        name = person;
                        
                        transaction.Commit();
                    }
                }
                return Ok(name);
            }
            catch (Exception)
            {

                return BadRequest("user not found");
            }
        }

        //get all users
        [Route("{action}/all")]
        public ActionResult FullUser()
        {
            try
            {
                List<User> userTable = new List<User>();

                using(ISession session = UserSession.OpenSession())
                {
                    using(ITransaction transaction = session.BeginTransaction())
                    {
                        var dataCopy = session.Query<User>().ToList();
                        userTable = dataCopy;
                        transaction.Commit();
                    }
                }

                return Ok(userTable);
            }
            catch (Exception)
            {

                return BadRequest("request was rejected");
            }
        }


        
        //create/post chat message
        [Route("{action}/{message}")]
        public ActionResult CreateMessage(string message)
        {
            try
            {
                
                var messageData = JsonConvert.DeserializeObject<Message>(message);
                

                //Message textMessage = new Message()
                //{
                //    Date = DateTime.Now,
                //    Context = "This actually worked eh, great job today. You are awesome!"
                //};

                
                using(ISession session = MessageSession.OpenSession())
                {
                    using(ITransaction transaction = session.BeginTransaction())
                    {
                        
                        session.Save(messageData);
                        transaction.Commit();
                        
                    }
                }
                return Ok(messageData);
            }
            catch (Exception e )
            {

                return BadRequest(e.Message);
            }
        }




        //get all messages from channel
        [Route("{action}/{channelId}")]
        public ActionResult FullMessage(Guid channelId)
        {
            try
            {
                List<Message> userTable = new List<Message>();

                using (ISession session = MessageSession.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                        var dataCopy = session.Query<Message>()
                        .OrderBy(x => x.Date)
                        .Where(x => x.ChannelId == channelId)
                        .ToList();
                        userTable = dataCopy;

                        //var dataCopy = session.Query<Message>().ToList();
                        //userTable = dataCopy;
                        //transaction.Commit();
                    }
                }

                return Ok(userTable);
            }
            catch (Exception)
            {

                return BadRequest("request was rejected");
            }
        }

        //creating a new channel
        //[Route("{action}")]
        //public ActionResult CreateChannel()
        //{
        //    try
        //    {
        //        Channel general = new Channel()
        //        {
        //            Name = "coding"
        //        };

        //        using(ISession session = ChannelSession.OpenSession())
        //        {
        //            using(ITransaction transaction = session.BeginTransaction())
        //            {
        //                session.Save(general);
        //                transaction.Commit();
        //            }
        //        }

        //        return Ok($"{general} was created");
        //    }
        //    catch (Exception)
        //    {

        //        return BadRequest("couldnt make channel");
        //    }
        //}

        //Getting single channel by name and returning object
        [Route("{action}/{name}")]
        public ActionResult GetChannel(string name)
        {
            List<Channel> channelId;
            try
            {
                using (ISession session = ChannelSession.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                        var person = session.Query<Channel>().Where(x =>x.Name == name).ToList();
                        
                        transaction.Commit();
                        channelId = person;
                    }
                }
                return Ok(channelId);
            }
            catch (Exception)
            {

                return BadRequest("user not found");
            }
        }

        //get all messages from channel
        [Route("{action}/{channelId}")]
        public ActionResult channelMessage(Guid channelId)
        {
            try
            {
                List<Message> userTable = new List<Message>();

                using (ISession session = MessageSession.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                        var dataCopy = session.Query<Message>().Where(x =>x.ChannelId == channelId).ToList();
                        userTable = dataCopy;
                        transaction.Commit();
                    }
                }

                return Ok(userTable);
            }
            catch (Exception)
            {

                return BadRequest("request was rejected");
            }
        }



        //Add foreign Key
        //create channel uuid
        //accept parameters for endpoints
    }
}
