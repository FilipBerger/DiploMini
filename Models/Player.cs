using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    internal class Player
    {
        public int Id { get; set; }
        public string FactionName { get; set; }
        public FactionColor Color { get; set; }
        public bool Defeated { get; set; }
    }
}
