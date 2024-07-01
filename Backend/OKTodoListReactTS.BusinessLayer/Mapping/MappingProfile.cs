using AutoMapper;
using OKTodoListReactTS.BusinessLayer.Dtos;
using OKTodoListReactTS.DataLayer.Entities;

namespace OKTodoListReactTS.BusinessLayer.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Application, ApplicationDto>().ReverseMap();
            CreateMap<EventType, EventTypeDto>().ReverseMap();
            CreateMap<ToDoEntry, ToDoDto>().ReverseMap();
        }
    }
}