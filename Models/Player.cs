using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiploMini.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string FactionName { get; set; }
        public FactionColors Color { get; set; }
        public bool Defeated { get; set; }
    }
}
