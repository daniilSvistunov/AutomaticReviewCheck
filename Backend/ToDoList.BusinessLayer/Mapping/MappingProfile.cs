using AutoMapper;
using ToDoList.BusinessLayer.Dtos;
using ToDoList.BusinessLayer.Entities;

namespace ToDoList.Api.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ToDoItem, ToDoItemDto>()
                .ForMember(dto => dto.id, model => model.MapFrom((m) => m.id))
                .ForMember(dto => dto.task, model => model.MapFrom((m) => m.task))
                .ForMember(dto => dto.isComplete, model => model.MapFrom((m) => m.isComplete))
                .ForMember(dto => dto.dueDate, model => model.MapFrom((m) => m.dueDate))
                .ReverseMap();
        }
    }
}