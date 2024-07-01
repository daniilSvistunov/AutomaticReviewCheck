using System;
using System.Threading.Tasks;
using OKTodoListReactTS.DataLayer.Entities;

namespace OKTodoListReactTS.BusinessLayer.Interfaces
{

    public interface IApplicationService
    {
        Task<Application> AddApplicationAsync(Application application);

        Task<Application> GetApplicationByIdAsync(Guid id);

        Task<Application> GetOrAddApplicationByNameAsync(string applicationName);
    }
}
