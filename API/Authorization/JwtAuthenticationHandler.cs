using API.Authorization;
using API.Authorization.Utilities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API
{
    public class JwtAuthenticationHandler : IJwtAuthenticationHandler
    {
        
        private readonly string _key;
        private readonly IRefreshTokenHandler _refreshTokenHandler;

        public JwtAuthenticationHandler(string key, IRefreshTokenHandler refreshTokenHandler)
        {
            _key = key;
            _refreshTokenHandler = refreshTokenHandler;
        }

        public TokenSet TokenCreation(string username, string userId)
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
                Expires = DateTime.UtcNow.AddMinutes(1),
                //Issuer = "John",
                //Audience = username,
                SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(tokenKey),
                SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);
            var rt = _refreshTokenHandler.GenerateToken();
            TokenSet newTokens = new TokenSet()
            {
                JwtToken = jwt,
                RefreshToken = rt
            };

            TokenManager.tokenList.Add(newTokens);

            return newTokens;
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
                ValidateLifetime = true,
                //ValidIssuer = "John"
                //ValidAudience = username,
            };

            try
            {
                var checkToken = tokenHandler.ValidateToken(jwt, validationParameters, out SecurityToken validateToken);
                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }

        public bool RefreshTokenValidation(TokenSet token)
        {
            return true;
        }
    }
}
