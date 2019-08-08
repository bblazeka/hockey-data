using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SportPredictor.Handlers;

namespace Predictor.Controllers.Api
{
    [Route("api/[controller]")]
    public class PlayerController : Controller
    {
        // PUT api/player/update
        [HttpGet("update")]
        public void Get()
        {
            
        }
    }
}
