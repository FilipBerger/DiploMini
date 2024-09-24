using DiploMini.Models;
using System.Reflection.Metadata.Ecma335;

namespace DiploMini.Server
{
    public interface IGameService
    {
        void SubmitOrder(List<Order> order);
        List<Country> GetUpdatedGameState();

    }
}
