namespace DiploMini.Server
{
    public class GameService : IGameService
    {
        Game _game;
        public GameService() 
        {
            _game = new Game();
            //_game = Game.CreateGame(List<Player> players, )

        }
        public void SubmitOrder(List<Order> order)
        {
            throw new NotImplementedException();
        }

        public List<Country> GetUpdatedGameState()
        {
            throw new NotImplementedException();
        }
    }
}
