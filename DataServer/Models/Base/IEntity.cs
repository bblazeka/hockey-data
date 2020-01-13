using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataServer.Models.Base
{
    public interface IEntity
    {
        void ParseJsonAnswer(string answer);
    }
}
