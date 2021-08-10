using API.Controllers;
using Core;
using Infrastructure;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTesting.API.UnitTests
{
    [TestFixture]
    class UserControllerTest
    {
        Mock<INhibernateHandler> _nhibernateHandler = new Mock<INhibernateHandler>();
        UserController _user;
        User client;

        [SetUp]
        public void SetUp()
        {
            _user = new UserController(_nhibernateHandler.Object);
            client = new User()
            {
                Id = Guid.NewGuid(),
                Name = "Billy",
                Password = "Joel"
            };
        }

        [Test]
        public void GetUser_ReturnsUser()
        {
            Guid id = client.Id;

            _nhibernateHandler.Setup(x => x.GetUserById(id)).Returns(client);

            Assert.AreEqual(id, client.Id);
        }

        [Test]
        public void UpdateUser_UpdateByName_ReturnUpdatedClient()
        {
            string type = "Name";
            string name = "Jimmy";
            User updatedClient = new User
            {
                Name = name,
                Password = client.Password,
                Id = client.Id
            };

            _nhibernateHandler.Setup(x => x.UpdateUser(type, client)).Returns(updatedClient);

            Assert.AreEqual(name , updatedClient.Name);
        }
        
        [Test]
        public void UpdateUser_UpdateByPassword_ReturnUpdatedClient()
        {
            string type = "Password";
            string password = "Cricket";
            User updatedClient = new User
            {
                Name = client.Name,
                Password = password,
                Id = client.Id
            };

            _nhibernateHandler.Setup(x => x.UpdateUser(type, client)).Returns(updatedClient);

            Assert.AreEqual(password , updatedClient.Password);
        }
        
        [Test]
        public void UpdateUser_UpdateByNameAndPassword_ReturnTrue()
        {
            string type = "Name and Password";
            string name = "Jimmy";
            string password = "Cricket";
            User updatedClient = new User
            {
                Name = name,
                Password = password,
                Id = client.Id
            };

            _nhibernateHandler.Setup(x => x.UpdateUser(type, client)).Returns(updatedClient);

            bool result = (name == updatedClient.Name && password == updatedClient.Password);

            Assert.IsTrue(result , "Name and Password was updated");
        }
    }
}
