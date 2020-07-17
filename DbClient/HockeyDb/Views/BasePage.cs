using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Controls;

namespace HockeyDb.Views
{
    public partial class BasePage : Page
    {
        public virtual void Refresh()
        {
            throw new NotImplementedException();
        }

        public delegate void ChangeStatus(string sampleParam, int result);

        public event ChangeStatus statusChange;

        public void RaiseStatusChange(string textToWrite, int result)
        {
            // Your logic
            if (statusChange != null)
            {
                statusChange(textToWrite, result);
            }
        }
    }
}
