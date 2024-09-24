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
        public List<int> AdjacentCountriesById { get; set; }
        public Army? OccupyingArmy { get; set; }

        public Country(int id, string name, bool supplyPoint, List<int> countryId)
        {
            Id = 0;
            Name = "";
            SupplyPoint = false;
            AdjacentCountriesById = new List<int>();
            OccupyingArmy = null;

        }

        public static List<Country> GetTestMap()
        {
            return new List<Country>()
            {
                new Country(1, "TestCountry1", true, new List<int>(){1}),
                new Country(2, "TestCountry2", true, new List<int>(){2,3}),
                new Country(3, "TestCountry3", true, new List<int>(){2})
            };
        }
    }
}
