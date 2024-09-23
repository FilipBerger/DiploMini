using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    internal class Country
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool SupplyPoint { get; set; }
        public List<Country> AdjacentCountries { get; set; }
        public Army? OccupyingArmy { get; set; }
    }
}
