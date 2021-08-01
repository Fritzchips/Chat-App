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
        private readonly IDictionary<string, string> users = new Dictionary<string, string>
        { { "hello", "world"}, { "yes", "sir"} };
        private readonly string key;

        public JwtAuthenticationManager(string key)
        {
            this.key = key;
        }

        //http request to database Nhibernate to check users where username and pass == inputs
        //logic stays in Nhibernate
        //if user exist, return back ok and that specific user info
        //Go throught this process and get a token
        //If user doesn't exist return a failed message prompting front end client to try again

        //First check will be from the Token
        //Exist or Expired? Then database will check it after if needed or just stays in the server

        public string Authenticate(string username, string password)
        {
            if (!users.Any(u => u.Key == username && u.Value == password))
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username)
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
