using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public class Message
    {

        public virtual Guid Id { get; set; }
        public virtual Guid ChannelId { get; set; }
        public virtual Guid UserId { get; set; }
        public virtual DateTime Date { get; set; }
        public virtual string Context { get; set; }

       
    }
}
