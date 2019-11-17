using System;
using System.Collections.Generic;
using System.Text;

namespace Server.Models
{
    public interface IEntity
    {
        void ParseJsonAnswer(string answer);
    }
}
