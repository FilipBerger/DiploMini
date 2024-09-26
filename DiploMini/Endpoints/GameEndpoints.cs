﻿using DiploMini.Models;
using Microsoft.AspNetCore.Http.HttpResults;
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
            app.MapGet("/GetInitialMap", GetInitialMap)
                .WithOpenApi()
                .WithSummary("Provides map with starting country values")
                .WithDescription("Informs on where to draw supply points and adjacent countries, as well as the board setup in terms of ownership and army placement.");

            app.MapGet("/GetUpdatedGameState", GetUpdatedGameState);
            app.MapPost("/PostOrders", MovementTestOrder);
            app.MapPost("/PostPlayers", PostPlayers);
            // Detailed documentation later?
        }

        public record CountryResponse(List<Country> Countries);
        public record ShortCountryResponse(int Id, int? OwnerId, int? ArmyId);
        public record GameStateResponse(int GameId, string IngameDate, List<int> Players, List<ShortCountryResponse> Map, List<string> History);

        static Results<Ok<CountryResponse>, NotFound> GetInitialMap([FromServices] IGameService gameService)
        {
            CountryResponse response = new( gameService.GetInitialMap() );
    
            if (response == null || response.Countries.Count == 0)
                return TypedResults.NotFound();
            return TypedResults.Ok(response);
        }

        static IResult GetUpdatedGameState([FromServices] IGameService gameService)
        {
            var game = gameService.GetUpdatedGameState();
            if (!game.UpdateReady)
                return TypedResults.NotFound();
            try {
                List<int> players = game.Players.Select(o => o.Id).ToList();
                List<ShortCountryResponse> map = game.Map
                    .Select(o => new ShortCountryResponse(o.Id, o.OwnerId, o.OccupyingArmy?.Id))
                    .ToList();

                var gameStateResponse = new GameStateResponse(game.Id, game.IngameDate, players, map, game.History);

                return TypedResults.Ok(gameStateResponse);
            }
            catch
            {
                return TypedResults.NotFound();
            }

            //List<Country> countryMap = gameService.GetUpdatedGameState();
            //if (countryMap == null)
            //{
            //    return Results.NotFound();
            //}
            //return Results.Ok(gameService.GetUpdatedGameState());
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

        static IResult PostPlayers([FromServices] IGameService gameService, [FromBody] List<string> playerNames)
        {
            if (Validator.ValidatePlayers(playerNames))
            {
                gameService.AddPlayersToGame(playerNames);
                // Borde returnera game state
                return TypedResults.Ok();
            }
            else
            {
                return TypedResults.BadRequest(new { message = "Player names are not unique or they are null or empty" });
            }
            
        }
    }
}
