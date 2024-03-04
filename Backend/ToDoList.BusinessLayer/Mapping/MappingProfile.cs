using AutoMapper;
using ToDoList.BusinessLayer.Dtos;
using ToDoList.BusinessLayer.Entities;

namespace ToDoList.BusinessLayer.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ToDoItem, ToDoItemDto>()
                .ForMember(dto => dto.id, model => model.MapFrom((m) => m.id))
                .ForMember(dto => dto.task, model => model.MapFrom((m) => m.task))
                .ForMember(dto => dto.state, model => model.MapFrom((m) => m.isComplete))
                .ForMember(dto => dto.date, model => model.MapFrom((m) => m.dueDate))
                .ReverseMap();
        }
    }
}