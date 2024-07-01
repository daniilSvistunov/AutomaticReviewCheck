using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Graph;

namespace OKTodoListReactTS.BusinessLayer.Interfaces
{
    public interface IGraphApiService
    {
        /// <summary>
        /// Gets all groups a user belongs to
        /// </summary>
        /// <returns>A list of groups</returns>
        Task<List<Group>?> GetGroupsUserBelongsToAsync();

        /// <summary>
        /// Gets the user who is requested
        /// </summary>
        /// <returns>A user</returns>
        Task<User?> GetUserAsync();

        /// <summary>
        /// Gets the user who is requested
        /// </summary>
        /// <param name="id"> The unique id of the user who is requested></param>
        /// <returns>A user</returns>
        Task<User?> GetUserByIdAsync(string id);
    }
}
