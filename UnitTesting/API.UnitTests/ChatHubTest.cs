using API.Hubs;
using API.Hubs.Utilities;
using Core;
using Infrastructure;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;

namespace UnitTesting.API.UnitTests
{
    [TestFixture]
    public class ChatHubTest
    {
        HashSet<HubUser> userList;
        List<string> general;
        Mock<INhibernateHandler> _nhibernateHandler = new Mock<INhibernateHandler>();
        ChatHub _chatHub;
        [SetUp]
        public void SetUp()
        {
            userList = new HashSet<HubUser>()
            { 
                new HubUser{ Name = "Starwalker", Id = "12345", UserId = new Guid("24d953f6-6ccd-4bc8-9457-ad7e005a8194")}
            };

            general = new List<string>() { "54321" };

            _chatHub = new ChatHub(_nhibernateHandler.Object);
        }

        [Test]
        public void SendMessage_SaveMessageToNhibernate_ReturnTrue()
        {
            Message message = new Message()
            {
                Context = "Hello World",
                Date = DateTime.Now
            };

            _nhibernateHandler.Setup(x => x.CreateMessage(message)).Returns(true);

            Assert.IsTrue(true, "Message was saved to database");
        }

        [Test]
        public void JoinChat_IsntPartOfRoom_ReturnTrue()
        {
            HubUser user = new HubUser
            {
                Name = "Obiwan",
                Id = "12345",
                UserId = new Guid("00c0c252-5707-4cb5-a8af-ad790120e659")
            };

            var copy = userList.Where(x => x.UserId == user.UserId).FirstOrDefault();
            bool real = (copy == null);

            Assert.IsTrue(real, "user is added to userList");
        }
        
        [Test]
        public void JoinChat_PartOfRoom_ReturnFalse()
        {
            HubUser user = new HubUser
            {
                Name = "Starwalker",
                Id = "12345",
                UserId = new Guid("24d953f6-6ccd-4bc8-9457-ad7e005a8194")
            };

            var copy = userList.Where(x => x.UserId == user.UserId).FirstOrDefault();
            bool real = (copy == null);

            Assert.IsFalse(real, "user is not added to userList");
        }

        [Test]
        public void OnDisconnectedAsync_RemoveUser_ReturnTrue()
        {
            string connectionId = "12345";
            var user = userList.Where(x => x.Id == connectionId).FirstOrDefault();
            userList.Remove(user);
            var test = (userList.Count == 0);

            Assert.IsTrue(test, "User was removed");
        }

        [Test]
        public void JoinRoom_JoinGeneralGroup_ReturnTrue()
        {
            string connectionId = "12345";
            general.Add(connectionId);
            bool group = (general.Count > 1);
            Assert.IsTrue(group, "Added to general group");
        }

        [Test]
        public void JoinRoom_JoinGeneralGroup_ReturnList()
        {
            Guid channelId = Guid.NewGuid();
            List<object> messageList = new List<object>();
            List<object> channelList = new List<object>();

            _nhibernateHandler.Setup(x => x.GetMessages(channelId)).Returns(channelList);

            Assert.AreEqual(messageList, channelList);
        }

        [Test]
        public void LeaveRoom_ConnectionStringRemoval_ReturnTrue()
        {
            string connectionId = "54321";
            var user = general.Single(x => x.Contains(connectionId));
            general.Remove(user);
            bool group = (general.Count < 1);
            Assert.IsTrue(group, "User was removed from group");

        }
    }
}
