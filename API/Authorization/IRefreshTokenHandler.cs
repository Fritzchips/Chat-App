namespace API.Authorization
{
    public interface IRefreshTokenHandler
    {
        string GenerateToken();
    }
}
