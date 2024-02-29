using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ardalis.Result;

namespace OKTemplate.BusinessLayer.Interfaces
{
    public interface ITaskApiService<out T>
    {
        Task<Result<List<Dtos.TaskDto>>> RetrieveTasksAsync();
    }
}