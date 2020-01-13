using System.IO;
using System.Net;

namespace DataServer.Mediators
{
    public class ApiMediator
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
