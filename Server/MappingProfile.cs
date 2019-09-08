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
        }
    }
}
