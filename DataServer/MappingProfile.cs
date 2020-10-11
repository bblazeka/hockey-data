using AutoMapper;
using DataServer.Models;
using DataServer.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataServer
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<GameData, GameViewModel>()
                .ForMember(dto => dto.Home, opt => opt.MapFrom(src => src.Home))
                .ForMember(dto => dto.Away, opt => opt.MapFrom(src => src.Away))
                .ForMember(dto => dto.StartDate, opt => opt.MapFrom(src => src.StartDate));
            CreateMap<GameViewModel, GameData>();
            CreateMap<Game, GameViewModel>()
                .ForMember(dto => dto.Home, opt => opt.MapFrom(src => src.Home))
                .ForMember(dto => dto.Away, opt => opt.MapFrom(src => src.Away))
                .ForMember(dto => dto.HomeGoals, opt => opt.MapFrom(src => src.HomeGoals))
                .ForMember(dto => dto.AwayGoals, opt => opt.MapFrom(src => src.AwayGoals))
                .ForMember(dto => dto.StartDate, opt => opt.MapFrom(src => src.DatePlayed));
            CreateMap<Team, TeamViewModel>()
                .ForMember(dto => dto.Name, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dto => dto.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dto => dto.Logo, opt => opt.MapFrom(src => src.Logo));
            CreateMap<TeamViewModel, Team>()
                .ForMember(dto => dto.FullName, opt => opt.MapFrom(src => src.Name))
                .ForMember(dto => dto.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dto => dto.Logo, opt => opt.MapFrom(src => src.Logo));
            CreateMap<Player, PlayerViewModel>()
                .ForMember(dto => dto.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dto => dto.Team, opt => opt.MapFrom(src => src.Team))
                .ForMember(dto => dto.BirthPlace, opt => opt.MapFrom(src => src.BirthPlace))
                .ForMember(dto => dto.Rookie, opt => opt.MapFrom(src => src.Rookie))
                .ForMember(dto => dto.Rostered, opt => opt.MapFrom(src => src.RosteredStatus))
                .ForMember(dto => dto.Position, opt => opt.MapFrom(src => src.Position));
            CreateMap<PlayerViewModel, Player>()
                .ForMember(dto => dto.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dto => dto.BirthPlace, opt => opt.MapFrom(src => src.BirthPlace))
                .ForMember(dto => dto.Rookie, opt => opt.MapFrom(src => src.Rookie))
                .ForMember(dto => dto.RosteredStatus, opt => opt.MapFrom(src => src.Rostered))
                .ForMember(dto => dto.Position, opt => opt.MapFrom(src => src.Position));
            CreateMap<Skater, SkaterViewModel>()
                .ForMember(dto => dto.Id, opt => opt.MapFrom(src => src.PlayerId))
                .ForMember(dto => dto.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dto => dto.Position, opt => opt.MapFrom(src => src.Position))
                .ForMember(dto => dto.Goals, opt => opt.MapFrom(src => src.Goals))
                .ForMember(dto => dto.Pim, opt => opt.MapFrom(src => src.Pim))
                .ForMember(dto => dto.Shots, opt => opt.MapFrom(src => src.Shots))
                .ForMember(dto => dto.Games, opt => opt.MapFrom(src => src.Games))
                .ForMember(dto => dto.Points, opt => opt.MapFrom(src => src.Points))
                .ForMember(dto => dto.PlusMinus, opt => opt.MapFrom(src => src.PlusMinus))
                .ForMember(dto => dto.Assists, opt => opt.MapFrom(src => src.Assists))
                .ForMember(dto => dto.TimeOnIce, opt => opt.MapFrom(src => src.TimeOnIce))
                .ForMember(dto => dto.Hits, opt => opt.MapFrom(src => src.Hits))
                .ForMember(dto => dto.Blocked, opt => opt.MapFrom(src => src.Blocked))
                .ForMember(dto => dto.GameWinningGoals, opt => opt.MapFrom(src => src.GameWinningGoals))
                .ForMember(dto => dto.OverTimeGoals, opt => opt.MapFrom(src => src.OverTimeGoals))
                .ForMember(dto => dto.PowerPlayGoals, opt => opt.MapFrom(src => src.PowerPlayGoals))
                .ForMember(dto => dto.PowerPlayPoints, opt => opt.MapFrom(src => src.PowerPlayPoints))
                .ForMember(dto => dto.PowerPlayTimeOnIce, opt => opt.MapFrom(src => src.PowerPlayTimeOnIce))
                .ForMember(dto => dto.ShortHandedGoals, opt => opt.MapFrom(src => src.ShortHandedGoals))
                .ForMember(dto => dto.ShortHandedPoints, opt => opt.MapFrom(src => src.ShortHandedPoints))
                .ForMember(dto => dto.ShortHandedTimeOnIce, opt => opt.MapFrom(src => src.ShortHandedTimeOnIce));
            CreateMap<SkaterViewModel, Skater>();
            CreateMap<Goalie, GoalieViewModel>()
                .ForMember(dto => dto.Id, opt => opt.MapFrom(src => src.PlayerId))
                .ForMember(dto => dto.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dto => dto.Position, opt => opt.MapFrom(src => src.Position))
                .ForMember(dto => dto.Games, opt => opt.MapFrom(src => src.Games))
                .ForMember(dto => dto.Ot, opt => opt.MapFrom(src => src.Ot))
                .ForMember(dto => dto.Shutouts, opt => opt.MapFrom(src => src.Shutouts))
                .ForMember(dto => dto.Losses, opt => opt.MapFrom(src => src.Losses))
                .ForMember(dto => dto.Saves, opt => opt.MapFrom(src => src.Saves))
                .ForMember(dto => dto.Toi, opt => opt.MapFrom(src => src.Toi))
                .ForMember(dto => dto.SavePerc, opt => opt.MapFrom(src => src.SavePerc))
                .ForMember(dto => dto.GlsAgainstAverage, opt => opt.MapFrom(src => src.GlsAgainstAverage))
                .ForMember(dto => dto.Wins, opt => opt.MapFrom(src => src.Wins));
            CreateMap<GoalieViewModel, Goalie>();
            CreateMap<Player, Goalie>();
            CreateMap<Player, Goalie>()
                .ForMember(dto => dto.PlayerId, opt => opt.MapFrom(src => src.PlayerId))
                .ForMember(dto => dto.Name, opt => opt.MapFrom(src => src.Name));
            CreateMap<Player, Skater>();
            CreateMap<Player, Skater>()
                .ForMember(dto => dto.PlayerId, opt => opt.MapFrom(src => src.PlayerId))
                .ForMember(dto => dto.Name, opt => opt.MapFrom(src => src.Name));
            CreateMap<Article, ArticleViewModel>()
                .ForMember(dto => dto.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dto => dto.Headline, opt => opt.MapFrom(src => src.Headline));
            CreateMap<Team, DropdownViewModel>()
                .ForMember(dto => dto.Value, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dto => dto.Key, opt => opt.MapFrom(src => src.Id))
                .ForMember(dto => dto.Src, opt => opt.MapFrom(src => src.Logo));
        }
    }
}
