using System.Diagnostics.Metrics;
using System.Numerics;

namespace DiploMini.Models
{
    public class Game
    {
        public int GameId { get; set; }
        public List<Player> Players { get; set; }
        public List<Country> Map { get; set; }
        public string IngameDate { get; set; }
        public List<string> History { get; set; }
        public List<Order> Orders { get; set; }
        public bool UpdateReady { get; set; }
        //public bool GameStarted { get; set; }
        //public Timer GameTimer { get; set; }

        public static Game GetTestGame()
        {
            Game test = new Game();
            test.GameId = 1;
            test.Players = Player.GetTestPlayers();
            test.Map = Country.GetTestMap();
            test.IngameDate = "Spring 1901";
            test.UpdateReady = true;
            test.History = new List<string>() { "Peace" };
            return test;
        }
    }
}
