using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class TokenController : BaseApiController
    {
        private readonly IJwtAuthenticationHandler _jwtAuthenticationManager;

        public TokenController(IJwtAuthenticationHandler jwtAuthenticationManag)
        {
            _jwtAuthenticationManager = jwtAuthenticationManag;
        }

        //creating jwt
        [HttpGet("{action}/{name}/{userId}")]
        public ActionResult NewToken(string name, string userId)
        {
            var token = _jwtAuthenticationManager.TokenCreation(name, userId);
            return Ok(token);
        }

        [HttpGet("{action}/{token}")]
        public bool TokenValidation(string token)
        {
            var value = _jwtAuthenticationManager.JwtValidation(token);
            return value;
        }

        [HttpGet("{action}/{reftoken}")]
        public bool RTValidation(string reftoken)
        {
            var value = _jwtAuthenticationManager.RefreshTokenValidation(reftoken);
            return value;
        }
    }
}
