using DiploMini.Models;
using System.Reflection.Metadata.Ecma335;


namespace DiploMini.Server
{
    public interface IGameService
    {
        void SubmitOrders(List<Order> order);

        void HandleMovement(List<Order> orders);
        List<Country> GetUpdatedGameState();

    }
}
