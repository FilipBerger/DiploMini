using DiploMini.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiploMini.Server.Endpoints
{
    public static class GameEndpoints
    {
        public static void MapGameEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapGet("/GetMap", GetUpdatedGameState);
            app.MapPost("/PostOrders", MovementTestOrder);
            // Detailed documentation later?
        }

        static IResult GetUpdatedGameState([FromServices] IGameService gameService)
        {
            List<Country> countryMap = gameService.GetUpdatedGameState();
            if (countryMap == null)
            {
                return Results.NotFound();
            }
            return Results.Ok(gameService.GetUpdatedGameState());
        }

        static IResult MovementTestOrder([FromServices] IGameService gameService, [FromBody] List<Order> orders)
        {
            gameService.HandleMovement(orders);
            return Results.Ok();
        }

        static IResult PostOrders([FromServices] IGameService gameService, [FromBody] List<Order> orders)
        {
            // Validate orders here, if valid, return OK, else return bad request.
            return Results.Ok();
        }
    }
}
