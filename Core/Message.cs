using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    class Message
    {
        public Guid Id { get; set; }
        public string Context { get; set; }
        public int Channel_Id { get; set; }
        public int User_Id { get; set; }

        public DateTime Date { get; set; }
    }
}
