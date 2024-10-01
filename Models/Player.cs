using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiploMini.Models
{
    public class Player
    {
        public int PlayerId { get; set; }
        public string FactionName { get; set; }
        public string Color { get; set; }
        public bool Defeated { get; set; }
        public bool SubmittedOrders { get; set; }

        public static List<Player> GetTestPlayers()
        {
            return new List<Player>()
            {
                new Player(){PlayerId = 1, FactionName = "TestFaction1", Color = "Red", Defeated = false, SubmittedOrders = false},
                new Player(){PlayerId = 2, FactionName = "TestFaction2", Color = "Green", Defeated = false, SubmittedOrders = false},
            };
        }
    }
}
