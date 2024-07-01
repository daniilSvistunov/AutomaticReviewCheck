using System;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Moq;
using OKTemplate.BusinessLayer.Services;
using Xunit;

namespace OKTodoListReactTS.BusinessLayer.Tests
{
    /// <summary>
    /// Runs tests on <see cref="BlobStorageService"/>
    /// </summary>
    public class BlobStorageServiceTests
    {
        private BlobStorageService _blobStorageService = null!;

        private readonly Mock<BlobServiceClient> _mockBlobServiceClient = new();
        private readonly Mock<BlobContainerClient> _mockBlobContainerClient = new();

        public BlobStorageServiceTests()
        {
            _mockBlobContainerClient.Setup(x => x.CanGenerateSasUri).Returns(true);
            _mockBlobContainerClient.Setup(x => x.Name).Returns("containerClient");

            _mockBlobServiceClient.Setup(c => c.GetBlobContainerClient(It.IsAny<string>())).Returns(_mockBlobContainerClient.Object);
        }

        [Fact]
        public async Task GenerateSasTokenAsync_ReturnsSasTokenCorrectly()
        {
            var tokenUri = new Uri("https://test.storage.windows.net?sas=token");

            _mockBlobContainerClient.Setup(c => c.GenerateSasUri(It.IsAny<BlobSasBuilder>())).Returns(tokenUri).Verifiable();

            _blobStorageService = new(_mockBlobServiceClient.Object);

            var guid = Guid.NewGuid();

            // Act
            var result = await _blobStorageService.GenerateSasTokenAsync(guid);

            // Assert: Check result is not null
            Assert.NotNull(result);

            // Assert: Query param should be returned
            Assert.Equal("?sas=token", result.Token);
            Assert.Equal(guid.ToString(), result.ContainerName);

            // Assert: Client call
            _mockBlobContainerClient.Verify(c => c.GenerateSasUri(It.IsAny<BlobSasBuilder>()), Times.Exactly(1));
        }

        [Fact]
        public async Task GenerateSasTokenAsync_ThrowsKeyInvalid()
        {
            _mockBlobContainerClient.Setup(x => x.CanGenerateSasUri).Returns(false).Verifiable();

            _blobStorageService = new(_mockBlobServiceClient.Object);

            // Act / Assert
            await Assert.ThrowsAsync<InvalidOperationException>(async () => await _blobStorageService.GenerateSasTokenAsync(Guid.NewGuid()));

            // Assert: Client call
            _mockBlobContainerClient.Verify(c => c.CanGenerateSasUri, Times.Exactly(1));
        }
    }
}
