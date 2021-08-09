using API.Authorization.Utilities;

namespace API
{
    public interface IJwtAuthenticationHandler
    {
        string TokenCreation(string username, string userId);

        bool JwtValidation(string jwt);

    } 
}
