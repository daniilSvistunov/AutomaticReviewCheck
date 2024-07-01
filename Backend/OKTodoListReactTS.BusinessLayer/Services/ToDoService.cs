using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using OKTodoListReactTS.BusinessLayer.Dtos;
using OKTodoListReactTS.BusinessLayer.Interfaces;
using OKTodoListReactTS.DataLayer;

namespace OKTodoListReactTS.BusinessLayer.Services
{
    public class ToDoService : IToDoService
    {
        private readonly IMapper _mapper;
        private readonly ToDoDbContext _dbContext;

        public ToDoService(IMapper mapper, ToDoDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<ToDoDto> AddTodoAsync(ToDoDto toDoDto)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteTodoAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ToDoDto>> GetAllTodosAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<ToDoDto> UpdateTodoAsync(ToDoDto toDoDto)
        {
            throw new NotImplementedException();
        }
    }
}
