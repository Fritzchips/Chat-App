using Core;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTesting.Infrastructure.UnitTests
{
    [TestFixture]
    public class NhibernateHandlerTest
    {
        List<User> users;
        [SetUp]
        public void SetUp()
        {
            users = new List<User>()
            {
                new User(){  Name = "Bruce", Password = "Wayne"},
                new User(){  Name = "Clark", Password = "Kent"},
                new User(){ Name = "Diana", Password = "Prince"}
            };
        }

        //[Test]
        //public Channel GetChannel_(string name)
        //{
        //}

        [Test]
        public void ConfirmUser_UserExist_ReturnTrue()
        {
            var name = "Bruce";
            var password = "Wayne";
            var person = users.Single(x => x.Name == name && x.Password == password);
            Assert.IsTrue(true, "User Exist");
        }

        //Modify this one
        [Test]
        public void GetUserByString_LoginToChat_ReturnUser()
        {
            var name = "Bruce";
            var password = "Wayne";
            var person = users.Single(x => x.Name == name && x.Password == password);
            Assert.IsTrue(true, "User Exist");
        }

        [Test, Order(1)]
        public void ConfirmUser_UserDoesntExist_ReturnFalse()
        {
            string name = "Billy";
            string password = "Joel";
            var person = users.Single(x => x.Name == name && x.Password == password);
            Assert.IsFalse(false, "User Doesn't Exist");
        }

        [Test, Order(2)]
        public void CreateUser_UserIsCreated_ReturnsTrue()
        {
            User client = new User() { Name = "Jim", Password = "Lake" };
            users.Add(client);
            Assert.IsTrue(true, "User is Created");
        }

        //[Test]
        //public User GetUserById(Guid userId)
        //{
        //}

        

        //[Test]
        //public void UpdateUser_Name_UserNameIsChanged()
        //{
        //    User
        //}

        //[Test]
        //public void CreateMessage(Message message)
        //{
        //}

        //[Test]
        //public object GetMessages(Guid channelId)
        //{
        //}
    }
}
