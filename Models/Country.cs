using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiploMini.Models
{
    public class Country
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool SupplyPoint { get; set; }
        public List<Country> AdjacentCountries { get; set; }
        public Army? OccupyingArmy { get; set; }

        public Country(int id, string name, bool supplyPoint, List<Country> country)
        {
            Id = 0;
            Name = "";
            SupplyPoint = false;
            AdjacentCountries = new List<Country>();
            OccupyingArmy = null;

        }
    }
}
