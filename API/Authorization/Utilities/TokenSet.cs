using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Authorization.Utilities
{
    public class TokenSet
    {
        public string JwtToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
