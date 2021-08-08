using System;
using System.Security.Cryptography;

namespace API.Authorization
{
    public class RefreshTokenHandler : IRefreshTokenHandler
    {
        public string GenerateToken()
        {
            var randomNumber = new byte[32];
            using(var randomNumberGenerator = RandomNumberGenerator.Create())
            {
                randomNumberGenerator.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
    }
}
