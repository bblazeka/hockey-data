using System;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using SportPredictor.Models;

namespace SportPredictor
{
    public class ApiHandler
    {
        public static string SendRequest(string url)
        {
            string answer = string.Empty;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                answer = reader.ReadToEnd();
            }
            return answer;
        }
    }
}
