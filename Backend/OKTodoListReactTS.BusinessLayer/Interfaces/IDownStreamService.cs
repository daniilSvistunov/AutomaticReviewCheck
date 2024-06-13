using System.Threading.Tasks;

namespace OKTemplate.BusinessLayer.Interfaces
{

    public interface IDownStreamService
    {
        Task<string> GetAsync(string path, string[] scopes, string baseUrl);

        Task<string> PostAsync(string path, string body, string[] scopes, string baseUrl);

        Task UpdateAsync(string path, string body, string[] scopes, string baseUrl);

        Task DeleteAsync(string path, string[] scopes, string baseUrl);
    }
}