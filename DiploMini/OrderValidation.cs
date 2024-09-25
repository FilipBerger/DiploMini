//using DiploMini.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace DiploMini.Server
//{
//    internal class OrderValidation
//    {   
//        public Order ValidateOrder(Order order, List<Country> countries)
//        {
                //Order needs to validated so that it there are values for everything but assistFaction. Army owners should match with db. Origin should match with db location. Check if target is adjacent to origin. Possibly check that nr of orders match nr of armies on server (by ownerID), so no armies are being "created".


//            if (!order.Origin.AdjacentCountries.Any(c => c.Name == order.Target.Name))
//            {
                
//            }

//            return order;
//        }
//    }
//}
