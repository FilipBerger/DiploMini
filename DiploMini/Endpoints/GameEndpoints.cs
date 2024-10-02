using DiploMini.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace DiploMini.Server.Endpoints
{
    public static class GameEndpoints
    {
        public static void MapGameEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapGet("/GetInitialGameState", GetInitialGameState)
                .WithOpenApi()
                .WithSummary("Returns the initial game state ")
                .WithDescription("Provides initial game state of the game including all necessary information to start the game.");
            app.MapPost("/PostOrders", PostOrders)
                .WithOpenApi()
                .WithSummary("Submits orders for the current turn")
                .WithDescription("Submits the updated orders for the current player turn");
            app.MapGet("/GetUpdatedGameState", GetUpdatedGameState)
                .WithOpenApi()
                .WithSummary("Provides updated game state")
                .WithDescription("Returns the updated game state after orders have been processed.");
            //app.MapPost("/PostPlayers", PostPlayers);
            //app.MapGet("/GetInitialMap", GetInitialMap) //Not active
            //.WithOpenApi()
            //.WithSummary("Provides map with starting country values")
            //.WithDescription("Informs on where to draw supply points and adjacent countries, as well as the board setup in terms of ownership and army placement.");
            // Detailed documentation later?
        }

        public record CountryResponse(List<Country> Countries);
        public record ShortCountryResponse(int CountryId, int? OwnerId, Army? OccupyingArmy, string color);
        public record GameStateResponse(int GameId, string IngameDate, List<int> Players, List<ShortCountryResponse> Map, List<string> History);
        public record OrderRequest(
            int ArmyId,
            int OwnerId,
            bool Contest,
            bool Support,
            string? AssistFaction,
            int Target,
            int Origin);

        static IResult GetInitialGameState([FromServices] IGameService gameService)
        {
            return TypedResults.Ok(gameService.GetGameState());
        }

        static IResult GetUpdatedGameState([FromServices] IGameService gameService)
        {
            var game = gameService.GetGameState();
            if (!game.UpdateReady)
                return TypedResults.NotFound();
            try
            {
                List<int> players = game.Players.Select(o => o.PlayerId).ToList();
                List<ShortCountryResponse> map = game.Map
                    .Select(o => new ShortCountryResponse(o.CountryId, o.OwnerId, o.OccupyingArmy, o.Color))
                    .ToList();

                var gameStateResponse = new GameStateResponse(game.GameId, game.IngameDate, players, map, game.History);

                return TypedResults.Ok(gameStateResponse);
            }
            catch
            {
                return TypedResults.NotFound();
            }
        }

        static IResult PostOrders([FromServices] IGameService gameService, [FromBody] List<OrderRequest> orderRequests)
        {
            if (orderRequests == null || !orderRequests.Any())
                return TypedResults.BadRequest(new { message = "No orders submitted." });
            try
            {
                var orders = orderRequests.Select(o => new Order
                {
                    ArmyId = o.ArmyId,
                    OwnerId = o.OwnerId,
                    Contest = o.Contest,
                    Support = o.Support,
                    AssistFaction = o.AssistFaction,
                    Target = o.Target,
                    Origin = o.Origin
                }).ToList();

                gameService.HandleMovement(orders);
                return TypedResults.Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing orders: {ex.Message} \n {ex.StackTrace}");
                return TypedResults.BadRequest(new { message = $"Error processing orders: {ex.Message}" });
            }
        }

        //static IResult MovementTestOrder([FromServices] IGameService gameService, [FromBody] List<OrderRequest> orderRequests)
        //{
        //    if (orderRequests == null || !orderRequests.Any())
        //        return TypedResults.BadRequest(new { message = "No orders submitted." });
        //    try
        //    {
        //        var orders = orderRequests.Select(o => new Order
        //        {
        //            ArmyId = o.ArmyId,
        //            OwnerId = o.OwnerId,
        //            Contest = o.Contest,
        //            Support = o.Support,
        //            AssistFaction = o.AssistFaction,
        //            Target = o.Target,
        //            Origin = o.Origin
        //        }).ToList();

        //        gameService.HandleMovement(orders);
        //        return TypedResults.Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Error processing orders: {ex.Message} \n {ex.StackTrace}");
        //        return TypedResults.BadRequest(new { message = $"Error processing orders: {ex.Message}" });
        //    }
        //}

        //static IResult SubmitOrders([FromServices] IGameService gameService, [FromBody] List<Order> orders)
        //{
        //    gameService.SubmitOrders(orders);
        //    return Results.Ok();
        //}

        //static IResult PostPlayers([FromServices] IGameService gameService, [FromBody] List<string> playerNames)
        //{
        //    if (Validator.ValidatePlayers(playerNames))
        //    {
        //        gameService.AddPlayersToGame(playerNames);
        //        var game = gameService.GetGameState();

        //        return TypedResults.Ok();
        //    }
        //    else
        //    {
        //        return TypedResults.BadRequest(new { message = "Player names are not unique or they are null/empty" });
        //    }

        //}

        //static Results<Ok<CountryResponse>, NotFound> GetInitialMap([FromServices] IGameService gameService)
        //{
        //    CountryResponse response = new(gameService.GetInitialMap());

        //    if (response == null || response.Countries.Count == 0)
        //        return TypedResults.NotFound();
        //    return TypedResults.Ok(response);
        //}
    }
}

