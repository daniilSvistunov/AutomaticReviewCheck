using OKTemplate.BusinessLayer.Interfaces;
using OKTemplate.DataLayer.Helpers;

namespace OKTemplate.BusinessLayer.Services
{
    /// <inheritdoc cref="IDemoDataService"/>
    public class DemoDataService : IDemoDataService
    {
        private readonly IMockDataGenerator _mockDataGenerator;

        public DemoDataService(IMockDataGenerator mockDataGenerator)
        {
            _mockDataGenerator = mockDataGenerator;
        }
    }
}