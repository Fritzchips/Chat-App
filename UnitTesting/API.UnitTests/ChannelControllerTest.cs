using API.Controllers;
using Core;
using Infrastructure;
using Moq;
using NUnit.Framework;
using System;

namespace UnitTesting.API.UnitTests
{
    [TestFixture]
    public class ChannelControllerTest
    {
        ChannelController _channel;
        Mock<INhibernateHandler> _nhibernateHandler = new Mock<INhibernateHandler>();
        [SetUp]
        public void SetUp()
        {
            _channel = new ChannelController(_nhibernateHandler.Object);
        }

        [Test]
        public void GetChannel_ReturnChannelInfo()
        {
            var channelName = "general";
            var channelId = Guid.NewGuid();
            var channelInfo = new Channel
            {
                Id = channelId,
                Name = channelName
            };

            _nhibernateHandler.Setup(x => x.GetChannel(channelName)).Returns(channelInfo);

            Assert.AreEqual(channelName, channelInfo.Name);
            
        }
    }
}
