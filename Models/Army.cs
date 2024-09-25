using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DiploMini.Models;

namespace DiploMini.Models
{
    public class Army
    {
        public int Id { get; set; }
        public Player Owner { get; set; }
    }
}
