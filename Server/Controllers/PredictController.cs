using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SportPredictor;

namespace Predictor.Controllers
{
    [Route("api/[controller]")]
    public class PredictController : Controller
    {
        private Classifier _classifier;

        public PredictController()
        {
            _classifier = new Classifier();
        }

        // GET api/predict
        [HttpGet]
        public object Get()
        {
            return _classifier.Evaluate();
        }

        // GET api/predict/table
        [HttpGet("table")]
        public object Table()
        {
            var startDate = "2018-09-15";
            var endDate = "2019-05-15";
            return _classifier.PredictSeason(startDate,endDate);
        }

        // GET api/predict/{date}
        [HttpGet("{date}")]
        public string Get(string date)
        {
            return string.Join("\n", _classifier.PredictDailyGames(date, date));
        }
    }
}
