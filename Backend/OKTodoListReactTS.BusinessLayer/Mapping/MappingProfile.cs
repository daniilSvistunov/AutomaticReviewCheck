using System;
using System.Linq;
using AutoMapper;
using OKTemplate.BusinessLayer.Dtos;
using OKTemplate.DataLayer.Entities;

namespace OKTemplate.Api.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ToDoEntry, ToDoDto>()
                .ForMember(dto => dto.DueDate, model => model.MapFrom(t => t.TargetDate))
                .ReverseMap()
                .ForMember(model => model.TargetDate, dto => dto.MapFrom(t => t.DueDate));
        }
    }
}