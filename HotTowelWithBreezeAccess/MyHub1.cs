using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace HotTowelWithBreezeAccess
{
    public class MyHub1 : Hub
    {
        public void Hello(string what)
        {
            Clients.All.helloToAll(what + DateTime.Now.ToString());
        }

        public void RefreshPages()
        {
            Clients.Others.refreshToDos();
        }
    }
}