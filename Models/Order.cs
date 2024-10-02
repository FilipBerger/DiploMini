using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiploMini.Models
{
    public class Order
    {
        public int ArmyId { get; set; }
        public int OwnerId { get; set; }
        public bool Contest { get; set; }
        public bool Support { get; set; }
        public string? AssistFaction { get; set; }
        public int Target { get; set; }
        public int Origin { get; set; }
    }
}
