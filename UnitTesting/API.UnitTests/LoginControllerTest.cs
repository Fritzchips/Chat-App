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
    public class LoginControllerTest
    { 
        Mock<INhibernateHandler> _nhibernateHandler = new Mock<INhibernateHandler>();
        LoginController _login;

        [SetUp]
        public void SetUp()
        {
            _login = new LoginController(_nhibernateHandler.Object);
        }       

        [Test]
        public void ConfirmUser_UserExist_ConfirmNhibernateMethodConfirmUserIsCalled()
        {
            string name = "Tom";
            string password = "Jerry";

            _login.ConfirmUser(name, password);
            _nhibernateHandler.Verify(x => x.ConfirmUser(name, password), Times.Once);
        }

        [Test]
        public void SignUp_CreateNewUser_ConfirmNhibernateMethodCreateUserIsCalled()
        {
            User userInfo = new User
            {
                Id = Guid.NewGuid(),
                Name = "Tom",
                Password = "Jerry"
            };
            var newUserCredentials = JsonConvert.SerializeObject(userInfo);

            _login.SignUp(newUserCredentials);
            _nhibernateHandler.Verify(x => x.CreateUser(It.IsAny<User>()), Times.Once);
        }

        [Test]
        public void SignIn_GetUserInfo_ConfirmNhibernateMethodGetUserByStringIsCalled()
        {
            string name = "Tom";
            string password = "Jerry";

            _login.SignIn(name, password);
            _nhibernateHandler.Verify(x => x.GetUserByString(name, password), Times.Once);
        }
    }
}
