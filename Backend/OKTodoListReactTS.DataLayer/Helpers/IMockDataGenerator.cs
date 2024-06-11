using System.Threading.Tasks;

namespace OKTemplate.DataLayer.Helpers
{
    public interface IMockDataGenerator
    {
        /// <summary>
        /// Generates demo data records
        /// </summary>
        /// <param name="dropData">Drops data before inserting if <c>true</c></param>
        Task GenerateDemoDataAsync(bool dropData = false);
    }
}