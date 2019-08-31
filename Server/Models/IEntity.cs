using System;
using System.Collections.Generic;
using System.Text;

namespace Server.Models
{
    public interface IEntity
    {
        void ParseAnswer(string answer);
    }
}
