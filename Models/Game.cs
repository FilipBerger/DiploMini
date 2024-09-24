using System.Diagnostics.Metrics;
using System.Numerics;

namespace DiploMini.Models
{
    public class Game
    {
        public int Id { get; set; }
        //public Timer GameTimer { get; set; }
        public List<Player> Players { get; set; }
        public List<Country> Map { get; set; }
        public string IngameDate { get; set; }
        //public bool AllPlayersReady { get; set; }

        //public Game() {
        //    Id = 0;
        //    //GameTimer = new Timer();
        //    Players = new List<Player>();
        //    Map = new List<Country>();
        //    IngameDate = "Spring 1901";
            
        //}

        public static Game GetTestGame()
        {
            Game test = new Game();
            test.Id = 1;
            test.Players = new List<Player>();
            test.Map = new List<Country>();
            test.IngameDate = "Spring 1901";
            return new Game();
        }
    }
      
}
