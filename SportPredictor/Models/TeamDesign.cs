using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace SportPredictor.Models
{
    public class TeamDesign : IEntity
    {
        public string PrimaryColor { get; set; }
        public string SecondaryColor { get; set; }
        public string TextColor { get; set; }

        public TeamDesign(string primaryColor, string secondaryColor, string textColor)
        {
            PrimaryColor = primaryColor;
            SecondaryColor = secondaryColor;
            TextColor = textColor;
        }

        public void ParseAnswer(string answer)
        {
            throw new NotImplementedException();
        }

        public static TeamDesign ParseOracle(DbDataReader row)
        {
            return new TeamDesign(row["primarycolor"].ToString(), row["secondcolor"].ToString(), row["textcolor"].ToString());
        }
    }
}
