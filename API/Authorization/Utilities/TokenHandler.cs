using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Authorization.Utilities
{
    public static class TokenManager
    {
        public static HashSet<TokenSet> tokenList = new HashSet<TokenSet>();
    }
}
