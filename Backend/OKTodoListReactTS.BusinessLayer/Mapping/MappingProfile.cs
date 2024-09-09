using System.Xml.Schema;
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
                .ForMember(ToDoDto.)
                .ReverseMap();
        }
    }
}