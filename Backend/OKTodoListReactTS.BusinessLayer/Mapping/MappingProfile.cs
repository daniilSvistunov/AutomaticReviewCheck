using AutoMapper;
using OKTemplate.BusinessLayer.Dtos;
using OKTemplate.DataLayer.Entities;

namespace OKTemplate.Api.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Füge hier die/das Mapping-Profile für ToDoEntry und ToDoDto ein
            //CreateMap<ToDoEntry, ToDoDto>().ReverseMap();

            CreateMap<ToDoEntry, ToDoDto>()
                .ForMember(dto => dto.DueDate, model => model.MapFrom(t => t.TargetDate))
                .ReverseMap()
                .ForMember(model => model.TargetDate, dto => dto.MapFrom(t => t.DueDate));
        }
    }
}