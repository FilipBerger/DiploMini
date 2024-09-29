using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiploMini.Models
{
    public class Country
    {
        public int CountryId { get; set; }
        public string Name { get; set; }
        public bool SupplyPoint { get; set; }
        public int? OwnerId { get; set; }
        public List<int> AdjacentCountriesById { get; set; }
        public Army? OccupyingArmy { get; set; }

        public Country(int countryId, 
            string name, 
            bool supplyPoint, 
            int ownerId, 
            List<int> adjacentCountriesById, 
            Army occupyingArmy)
        {
            CountryId = countryId;
            Name = name;
            SupplyPoint = supplyPoint;
            OwnerId = ownerId;
            AdjacentCountriesById = adjacentCountriesById;
            OccupyingArmy = occupyingArmy;

        }

        public static List<Country> GetTestMap()
        {
            return new List<Country>()
            {
                new Country(1,"CountryA", false, 0, new List<int>(){}, null),
                new Country(2,"CountryB", true, 1, new List<int>(){}, (new Army() {Id = 1, OwnerId = 1})),
                new Country(3,"CountryC", false, 0, new List<int>(){}, null),
                new Country(4,"CountryD", false, 0, new List<int>(){}, null),
                new Country(5,"CountryE", false, 0, new List<int>(){}, null),
                new Country(6,"CountryF", true, 0, new List<int>(){}, null),
                new Country(7,"CountryG", false, 0, new List<int>(){}, null),
                new Country(8,"Småland", true, 0, new List<int>(){}, null),
            };
        }
    }
}
