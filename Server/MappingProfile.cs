using AutoMapper;
using Server.Models;
using Server.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server
{
    public class MappingProfile : Profile 
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<GameData, GameViewData>()
                .ForMember(dto => dto.Home, opt => opt.MapFrom(src => src.Home))
                .ForMember(dto => dto.Away, opt => opt.MapFrom(src => src.Away))
                .ForMember(dto => dto.StartDate, opt => opt.MapFrom(src => src.StartDate));
            CreateMap<GameViewData, GameData>();
            CreateMap<Team, TeamViewData>();
            CreateMap<TeamViewData, Team>()
                .ForMember(dto => dto.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dto => dto.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dto => dto.Logo, opt => opt.MapFrom(src => src.Logo));
            CreateMap<Player, PlayerViewData>()
                .ForMember(dto => dto.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dto => dto.BirthPlace, opt => opt.MapFrom(src => src.BirthPlace))
                .ForMember(dto => dto.Position, opt => opt.MapFrom(src => src.Position));
            CreateMap<PlayerViewData, Player>()
                .ForMember(dto => dto.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dto => dto.BirthPlace, opt => opt.MapFrom(src => src.BirthPlace))
                .ForMember(dto => dto.Position, opt => opt.MapFrom(src => src.Position));
            CreateMap<Skater, SkaterViewData>()
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
            CreateMap<SkaterViewData, Skater>();
            CreateMap<Goalie, GoalieViewData>()
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
            CreateMap<GoalieViewData, Goalie>();
        }
    }
}
