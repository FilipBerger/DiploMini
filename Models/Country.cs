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

        public Country(int id, string name, bool supplyPoint, List<int> countryId, Army occupyingArmy)
        {
            Id = id;
            Name = name;
            SupplyPoint = supplyPoint;
            AdjacentCountriesById = countryId;
            OccupyingArmy = occupyingArmy;

        }

        public static List<Country> GetTestMap()
        {
            return new List<Country>()
            {
                new Country(1,"TestCountry1", true, new List<int>(){1}, new Army() { Id = 1, Owner = new Player() { Id = 1, FactionName = "TestFaction1", Color = FactionColors.Red, Defeated = false } }),
                new Country(2,"TestCountry2", true, new List<int>(){2,3}, null),
                new Country(3,"TestCountry3", true, new List<int>(){2}, null)
            };
        }
    }
}
