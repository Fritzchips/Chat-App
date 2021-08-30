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
        public void GetChannel_ConfirmNhibernateMethodGetChannelIsCalled()
        {
            var channelName = "general";

            _channel.GetChannel(channelName);
            _nhibernateHandler.Verify(x => x.GetChannel(channelName), Times.Once);
            
        }
    }
}
