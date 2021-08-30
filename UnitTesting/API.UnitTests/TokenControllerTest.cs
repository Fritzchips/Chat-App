using API;
using API.Controllers;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;

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
        public void NewToken_CreateJwtStringToken_ConfirmJwtAuthenticationManagerMethodTokenCreationIsCalled()
        {
            string name = "michael";
            string userId = "123456";

            _tokens.NewToken(name, userId);
            _jwtAuthenticationManager.Verify(x => x.TokenCreation(name, userId), Times.Once);
        }

        [Test]
        public void TokenValidation_TokenIsValid_ConfirmJwtAuthenticationManagerMethodJwtValidationIsCalled()
        {
            string jwt = "123";
            _tokens.TokenValidation(jwt);
            _jwtAuthenticationManager.Verify(x => x.JwtValidation(jwt), Times.Once);
        }
        
    }
}

