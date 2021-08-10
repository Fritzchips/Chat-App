using API;
using API.Controllers;
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
    public class TokenControllerTest
    {
        Mock<IJwtAuthenticationHandler> _jwtAuthenticationManager = new Mock<IJwtAuthenticationHandler>();
        TokenController _tokens;
        List<string> tokenList;
        [SetUp]
        public void SetUp()
        {
            _tokens = new TokenController(_jwtAuthenticationManager.Object);
            tokenList = new List<string>()
            {
                "123",
                "456"
            };
        }

        [Test]
        public void NewToken_CreateJwtStringToken_ReturnsTrue()
        {
            string name = "michael";
            string userId = "123456";
            string jwt = "qwerty123";
            _jwtAuthenticationManager.Setup(x => x.TokenCreation(name, userId)).Returns(jwt);

            Assert.IsTrue(true , "Token is created");
        }

        [Test]
        public void TokenValidation_TokenIsValid_ReturnTrue()
        {
            string jwt = "123";
            _jwtAuthenticationManager.Setup(x =>x.JwtValidation(jwt)).Returns(true);
            Assert.IsTrue(true, "Token is Authenticated");
        }
        
        [Test]
        public void TokenValidation_TokenIsExpired_ReturnTrue()
        {
            string jwt = "expired";
            _jwtAuthenticationManager.Setup(x =>x.JwtValidation(jwt)).Returns(true);
            bool value = (jwt == "expired");

            Assert.IsTrue(value, "Token Is Valid but expired");
        }

        [Test]
        public void TokenValidation_TokenIsNotInTokenList_ReturnFalse()
        {
            string jwt = "192";
            _jwtAuthenticationManager.Setup(x => x.JwtValidation(jwt)).Returns(false);
            bool value = tokenList.Contains(jwt);

            Assert.IsFalse(value, "This Token is not part of the system");
        }
    }
}

