using API.Authorization;
using API.Authorization.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API
{
    public interface IJwtAuthenticationHandler
    {
        TokenSet TokenCreation(string username, string userId);

        bool JwtValidation(string jwt);

        bool RefreshTokenValidation(TokenSet token);
    } 
}
