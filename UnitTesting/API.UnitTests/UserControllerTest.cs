using API.Controllers;
using Core;
using Infrastructure;
using Moq;
using Newtonsoft.Json;
using NUnit.Framework;
using System;

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
        public void GetUser_GetUserInfo_ConfirmNhibernateMethodGetUserByIdIsCalled()
        {
            Guid id = client.Id;
            _user.GetUser(id);
            _nhibernateHandler.Verify(x => x.GetUserById(id), Times.Once);
        }

        [Test]
        public void UpdateUser_UserInfoUpdated_ConfirmNhibernateMethodUpdateUserIsCalled()
        {
            string type = "Name";
            string name = "Jimmy";
            User updatedClient = new User
            {
                Name = name,
                Password = client.Password,
                Id = client.Id
            };

            var clientCredentials = JsonConvert.SerializeObject(updatedClient);

            _user.UpdateUser(type, clientCredentials);
            _nhibernateHandler.Verify(x => x.UpdateUser(type, It.IsAny<User>()), Times.Once);
        }
        
    }
}
