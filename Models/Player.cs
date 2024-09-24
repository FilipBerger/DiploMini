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

        public static List<Player> GetTestPlayers()
        {
            return new List<Player>()
        {
            new Player(){Id = 1, FactionName = "TestFaction1", Color = FactionColors.Red, Defeated = false},
            new Player(){Id = 2, FactionName = "TestFaction2", Color = FactionColors.Green, Defeated = false},
        };
        }
    }

    
}
