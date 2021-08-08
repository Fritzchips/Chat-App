using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Authorization
{
    public interface IRefreshTokenHandler
    {
        string GenerateToken();
    }
}
