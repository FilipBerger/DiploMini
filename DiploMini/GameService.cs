using DiploMini.Models;

namespace DiploMini.Server
{
    public class GameService : IGameService
    {
        public Game Game { get; set; }

        public GameService() 
        {
            Game = Game.GetTestGame();
        }

        public void SubmitOrders(List<Order> orders)
        {
            
        }

        public List<Country> GetInitialMap()
        {
            return Game.Map;
        }

        public Game GetUpdatedGameState()
        {
            return Game;
            //return Game.Map;
        }
        public void HandleMovement(List<Order> orders)
        {
            foreach (Order order in orders)
            {
                var targetCountry = Game.Map.FirstOrDefault(c => c.Name == order.Target);
                if (targetCountry == null) 
                    continue;
                targetCountry.OccupyingArmy = new Army() { Id = order.ArmyId, OwnerId = order.OwnerId };
                targetCountry.OwnerId = order.OwnerId;
                if(order.Origin != order.Target)
                {
                    var originCountry = Game.Map.FirstOrDefault(c => c.Name == order.Origin);
                    originCountry.OccupyingArmy = null;
                }

            }
        }

        public void AddPlayersToGame(List<string> playerNames)
        {
            FactionColors[] factionColors = (FactionColors[])Enum.GetValues(typeof(FactionColors));

            for (int i = 0; i < playerNames.Count; i++)
            {
                Game.Players.Add(new Player()
                {
                    Id = i + 1,
                    FactionName = playerNames[i],
                    Color = factionColors[i + 1],
                    Defeated = false
                });
            }
        }
    }
}
