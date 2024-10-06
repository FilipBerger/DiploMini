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

        public void SubmitOrders(List<Order> orders)    // Not implemented - Collect orders sent from all players before running movement logic
        {
            if (Game.Orders == null)
                Game.Orders = orders;
            else
                Game.Orders.AddRange(orders);   
            var player = Game.Players.Where(p => p.PlayerId == orders[0].OwnerId).FirstOrDefault();
            player.SubmittedOrders = true;

            if (Game.Players
                .Where(p => !p.Defeated)
                .All(p => p.SubmittedOrders))
            {
                HandleMovement(orders);
                Game.UpdateReady = true;
            }
        }

        public List<Country> GetInitialMap()
        {
            return Game.Map;
        }

        public Game GetGameState()
        {
            foreach (var country in Game.Map)   // Set all country color values based on owner (not owned/neutral is grey)
                country.Color = Game.Players.Where(p => p.PlayerId == country.OwnerId).Select(p => p.Color).FirstOrDefault("Grey");
            return Game;
            //return Game.Map;
        }
        public void HandleMovement(List<Order> orders)  // Always assume army moves into the order target country, overwriting present armies
        {
            // Should first run order validation (not implemented)
            foreach (Order order in orders) 
            {
                var targetCountry = Game.Map.FirstOrDefault(c => c.CountryId == order.Target);
                if (targetCountry == null) 
                    continue;
                targetCountry.OccupyingArmy = new Army() { Id = order.ArmyId, OwnerId = order.OwnerId };
                targetCountry.OwnerId = order.OwnerId;
                targetCountry.Color = Game.Players.Where(p => p.PlayerId == order.OwnerId).Select(p => p.Color).FirstOrDefault();   
                if(order.Origin != order.Target)
                {
                    var originCountry = Game.Map.FirstOrDefault(c => c.CountryId == order.Origin);  // Clear army from origin 
                    originCountry.OccupyingArmy = null;
                }

            }
        }

        public void AddPlayersToGame(List<string> playerNames)  // Not implemented
        {
            FactionColors[] factionColors = (FactionColors[])Enum.GetValues(typeof(FactionColors));

            for (int i = 0; i < playerNames.Count; i++)
            {
                Game.Players.Add(new Player()
                {
                    PlayerId = i + 1,
                    FactionName = playerNames[i],
                    Color = factionColors[i + 1].ToString(),
                    Defeated = false
                });
            }
        }
    }
}
