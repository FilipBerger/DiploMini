using DiploMini.Models;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiploMini.Server
{
    internal class OrderValidation
    {   
        public Order ValidateOrder(Order order, List<Country> countries)
        {
            if (!order.Origin.AdjacentCountries.Any(c => c.Name == order.Target.Name))
            {
                
            }

            return order;
        }
    }
}
