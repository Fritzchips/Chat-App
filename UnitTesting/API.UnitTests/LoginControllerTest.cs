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
        public void ConfirmUser_UserExist_ReturnTrue()
        {
            string name = "Tom";
            string password = "Jerry";
            User user = new User
            {
                Name = name,
                Password = password
            };

            var value = _nhibernateHandler.Setup(x => x.ConfirmUser(name, password)).Returns(true);

            Assert.IsTrue(true, "User exist");
        }
        
        [Test]
        public void ConfirmUser_UserDoesntExist_ReturnFalse()
        {
            string name = "Tom";
            string password = "Jerry";
            User user = new User
            {
                Name = name,
                Password = password
            };

            var value = _nhibernateHandler.Setup(x => x.ConfirmUser(name, password)).Returns(false);

            Assert.IsFalse(false, "User exist");
        }

        [Test]
        public void SignUp_CreateNewUser_ReturnsTrue()
        {
            string name = "Tom";
            string password = "Jerry";
            User user = new User
            {
                Name = name,
                Password = password
            };

            _nhibernateHandler.Setup(x => x.CreateUser(user)).Returns(true);

            Assert.IsTrue(true, "user was created");
        }

        [Test]
        public void SignIn_GetUserInfo_ReturnsUserInfo()
        {
            string name = "Tom";
            string password = "Jerry";
            User user = new User
            {
                Name = name,
                Password = password
            };

            _nhibernateHandler.Setup(x => x.GetUserByString(name, password)).Returns(user);

            Assert.AreEqual(name, user.Name);
        }
    }
}
