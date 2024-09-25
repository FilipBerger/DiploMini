using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiploMini.Models
{
    public class Order
    {
        public int Army { get; set; }
        public string Faction { get; set; }
        public int OwnerId { get; set; }
        public bool Contest { get; set; }
        public bool Support { get; set; }
        public string? AssistFaction { get; set; }
        public string? Target { get; set; }
        public string Origin { get; set; }
    }
}
