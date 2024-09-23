using System.Diagnostics.Metrics;
using System.Numerics;

namespace Models
{
    public class Game
    {
        public int Id { get; set; }
        public Timer GameTimer { get; set; }
        public List<Player> Players { get; set; }
        public List<Country> Map { get; set; }
        public string IngameDate { get; set; }
    }
      
}
