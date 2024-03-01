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

/*
 *             CreateMap<ToDoItemDto, ToDoItem>()
                .ForMember(model => model.id, dto => dto.MapFrom((d) => d.id))
                .ForMember(model => model.task, dto => dto.MapFrom((d) => d.task))
                .ForMember(model => model.isComplete, dto => dto.MapFrom((d) => d.isComplete))
                .ForMember(model => model.dueDate, dto => dto.MapFrom((d) => d.dueDate));
*/