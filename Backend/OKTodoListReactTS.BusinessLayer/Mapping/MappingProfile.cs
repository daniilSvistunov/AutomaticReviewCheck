using AutoMapper;
using OKTodoListReactTS.BusinessLayer.Dtos;
using OKTodoListReactTS.DataLayer.Entities;

namespace OKTodoListReactTS.BusinessLayer.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ToDoEntry, ToDoDto>().ReverseMap()
                .ForMember(model => model.TargetDate, dto => dto.MapFrom(t => t.DueDate))
                .ReverseMap()
                .ForMember(dto => dto.DueDate, model => model.MapFrom(t => t.TargetDate));
        }
    }
}