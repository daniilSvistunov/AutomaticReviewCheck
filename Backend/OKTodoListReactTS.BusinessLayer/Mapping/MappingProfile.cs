using AutoMapper;
using OKTodoListReactTS.BusinessLayer.Dtos;
using OKTodoListReactTS.DataLayer.Entities;

namespace OKTodoListReactTS.BusinessLayer.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ToDoEntry, ToDoDto>()
                .ForMember(dto => dto.DueDate, model => model.MapFrom((m) => m.TargetDate))
                .ReverseMap()
                .ForMember(model => model.TargetDate, dto => dto.MapFrom((d) => d.DueDate));
        }
    }
}