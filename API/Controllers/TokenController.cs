using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TokenController : BaseApiController
    {
        private readonly IJwtAuthenticationHandler _jwtAuthenticationManager;

        public TokenController(IJwtAuthenticationHandler jwtAuthenticationManag)
        {
            _jwtAuthenticationManager = jwtAuthenticationManag;
        }

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
    }
}
