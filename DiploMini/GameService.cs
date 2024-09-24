namespace DiploMini.Server
{
    public class GameService : IGameService
    {
        Game _game;
        public GameService() 
        {
            _game = Game.GetTestGame();
            

        }
        public void SubmitOrder(List<Order> orders)
        {
            
        }

        public List<Country> GetUpdatedGameState()
        {
            throw new NotImplementedException();
        }
    }
}
