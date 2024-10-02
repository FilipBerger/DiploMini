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
        public bool IsSupplyPoint { get; set; }
        public int? OwnerId { get; set; }
        public List<int> AdjacentCountriesById { get; set; }
        public Army? OccupyingArmy { get; set; }
        public string Shape {  get; set; }
        public string Color { get; set; }
        public List<int> Center { get; set; }


        public Country(int countryId, 
            string name, 
            bool isSupplyPoint, 
            int ownerId, 
            List<int> adjacentCountriesById, 
            Army occupyingArmy,
            string shape,
            string color,
            List<int> center)
        {
            CountryId = countryId;
            Name = name;
            IsSupplyPoint = isSupplyPoint;
            OwnerId = ownerId;
            AdjacentCountriesById = adjacentCountriesById;
            OccupyingArmy = occupyingArmy;
            Shape = shape;
            Color = color;
            Center = center;
        }

        public static List<Country> GetTestMap()
        {
            return new List<Country>()
            {
                new Country(11,
                "CountryA", 
                false, 
                1, 
                new List<int>(){ 12, 13, 15 }, 
                new Army() {Id = 11, OwnerId = 1}, 
                "m72,170l-33,-18l-20,-58l36,-38l28,29l56,-17l35,45l-34,51l-68,6z",
                "Grey", 
                new List<int>(){ 100, 120 }),

                new Country(12,
                "CountryB", 
                true, 
                1, 
                new List<int>(){ 11, 13, 14, 15 }, 
                null,
                "m90,187l65,-6l36,-60l49,-2l42,65l-82,10l-68,49l-40,-25l-2,-31z",
                "Grey",
                new List<int>(){ 170, 190 }),

                new Country(13,
                "CountryC", 
                false, 
                1, 
                new List<int>(){ 11, 12, 14 }, 
                new Army() {Id = 8, OwnerId = 1},
                "m194,102l-32,-36l70,-40l95,28l-15,47l-47,22l-20,-24l-51,3z",
                "Grey",
                new List<int>() { 240, 70 }),
                
                new Country(14, 
                "CountryD", 
                false, 
                2, 
                new List<int>(){ 12, 13, 17 }, 
                new Army() {Id = 15, OwnerId = 2},
                "m276,139l51,-23l14,-48l47,26l14,67l-38,20l-69,-2l-19,-40z",
                "Grey",
                new List < int >() { 340, 130 }),
                
                new Country(15,
                "CountryE", 
                false, 
                0, 
                new List<int>(){ 11, 12, 16}, 
                null,
                "m74,185l-37,-16l-21,59l27,77l44,13l45,-57l-60,-34l2,-42z",
                "Grey",
                new List < int >() { 60, 250 }),
                
                new Country(16,
                "CountryF", 
                true, 
                2, 
                new List<int>(){ 15, 17, 18 }, 
                new Army() {Id = 16, OwnerId = 2},
                "m104,326l45,-56l26,35l54,0l24,-19l27,15l-62,44l-114,-19z",
                "Grey",
                new List < int >() { 180, 310 }),
                
                new Country(17,
                "CountryG", 
                false, 
                0, 
                new List<int>(){ 14, 16, 18 }, 
                null,
                "m267,272l35,-39l10,-39l58,-1l24,-4l18,70c0,0 -51,6 -52,6c-1,0 -71,25 -71,25c0,0 -22,-18 -22,-18z",
                "Grey",
                new List < int >() { 350, 230 }),
                
                new Country(18,
                "Småland", 
                true, 
                2, 
                new List<int>(){ 16, 17 }, 
                new Army() {Id = 3, OwnerId = 2},
                "m256,338l43,-37l62,-22l30,-4l-20,52c0,0 -35,17 -37,19c-2,2 -61,10 -62,10c-1,0 -16,-18 -16,-18z",
                "Grey",
                new List < int >() { 330, 320 }),
            };
        }
    }
}
