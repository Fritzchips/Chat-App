using API.Authorization.Utilities;

namespace API
{
    public interface IJwtAuthenticationHandler
    {
        TokenSet TokenCreation(string username, string userId);

        bool JwtValidation(string jwt);

        bool RefreshTokenValidation(string refToken);
    } 
}
