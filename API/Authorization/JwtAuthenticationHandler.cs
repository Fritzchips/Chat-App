using API.Authorization;
using API.Authorization.Utilities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace API
{
    public class JwtAuthenticationHandler : IJwtAuthenticationHandler
    {
        
        private readonly string _key;

        public JwtAuthenticationHandler(string key)
        {
            _key = key;
        }

        public string TokenCreation(string username, string userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(_key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.NameIdentifier, userId)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(tokenKey),
                SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            TokenManager.tokenList.Add(jwt);

            return jwt;
        }

        public bool JwtValidation(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(_key);
            var validationParameters = new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(tokenKey),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true
            };

            try
            {
                var tokenInList = TokenManager.tokenList.Single(x => x.Contains(jwt));
                TokenManager.tokenList.Remove(tokenInList);

                var checkToken = tokenHandler.ValidateToken(jwt, validationParameters, out SecurityToken validateToken);

                return true;
            }
            catch (SecurityTokenExpiredException)
            {
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
