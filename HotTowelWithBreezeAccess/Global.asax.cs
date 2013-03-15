using HotTowelWithBreezeAccess.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace HotTowelWithBreezeAccess
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            //Code for signalr below
            RouteTable.Routes.MapHubs();
            //Code for signalr above

            //api    
            BreezeWebApiConfig.RegisterBreezePreStart();

            //hot towel    
            HotTowelRouteConfig.RegisterHotTowelPreStart();
            HotTowelConfig.PreStart();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}