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
    public class JwtAuthenticationManager : IJwtAuthenticationManager
    {
        //change for database

        private readonly string _key;

        public JwtAuthenticationManager(string key)
        {
            _key = key;
        }

        //http request to database Nhibernate to check users where username and pass == inputs
        //logic stays in Nhibernate
        //if user exist, return back ok and that specific user info
        //Go throught this process and get a token
        //If user doesn't exist return a failed message prompting front end client to try again

        //First check will be from the Token
        //Exist or Expired? Then database will check it after if needed or just stays in the server

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
            //gives back security token
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);

        }
    }
}
