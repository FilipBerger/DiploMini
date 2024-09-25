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

        public void HandleMovement(List<Order> orders)
        {
            foreach (Order order in orders)
            {
                var targetCountry = Game.Map.FirstOrDefault(c => c.Name == order.Target);
                targetCountry.OccupyingArmy = new Army() { Id = 1, Owner = new Player() { Id = 1, FactionName = "TestFaction1", Color = FactionColors.Red, Defeated = false } };
            }
        }
        public List<Country> GetUpdatedGameState()
        {
            throw new NotImplementedException();
        }
    }
}
