using System.Collections.Generic;
using System.Security.Claims;
using OKTemplate.Api.Authorization;
using OKTemplate.BusinessLayer.Dtos.Enums;
using Xunit;

namespace OKTemplate.Api.Tests
{
    /// <summary>
    /// Runs tests on <see cref="ClaimsHelper"/>
    /// </summary>
    public class ClaimsHelperTests
    {
        private readonly ClaimsHelper _claimsHelper;

        private const string NameClaimType = "name";

        private readonly string _defaultEmail;
        private readonly string _defaultName;

        public ClaimsHelperTests()
        {
            // Arrange
            _defaultEmail = "tester@objektkultur.de";
            _defaultName = "Tester Objektkultur";

            _claimsHelper = new ClaimsHelper();
        }

        [Fact]
        public void GetUpnFromClaims_ReturnsAnEmailAsString()
        {
            // Act
            var upn = _claimsHelper.GetUpnFromClaims(GetValidIdentity());

            // Assert: Check return type
            Assert.IsType<string>(upn);

            // Assert: Check payload
            Assert.Equal(_defaultEmail, upn);
        }

        [Fact]
        public void GetUpnFromClaims_ReturnsNullIfNoEmailExists()
        {
            // Act
            var upn = _claimsHelper.GetUpnFromClaims(GetInvalidIdentity(true));

            // Assert: Check payload
            Assert.Null(upn);
        }

        [Fact]
        public void GetNameFromClaims_ReturnsANameAsString()
        {
            // Act
            var name = _claimsHelper.GetNameFromClaims(GetValidIdentity());

            // Assert: Check return type
            Assert.IsType<string>(name);

            // Assert: Check payload
            Assert.Equal(_defaultName, name);
        }

        [Fact]
        public void GetNameFromClaims_ReturnsNullIfNoNameExists()
        {
            // Act
            var name = _claimsHelper.GetNameFromClaims(GetInvalidIdentity(false));

            // Assert: Check payload
            Assert.Null(name);
        }

        [Fact]
        public void GetRolesFromClaims_ReturnsRolesAsList()
        {
            // Act
            var claimsResult = _claimsHelper.GetRolesFromClaims(GetValidIdentity());

            // Assert: Check return type
            Assert.NotNull(claimsResult);
            Assert.IsAssignableFrom<IList<AzureRoleDto>>(claimsResult);

            // Assert: Check payload
            Assert.NotEmpty(claimsResult);

            // Assert: The unknown role should be ignored
            Assert.Single(claimsResult);
        }

        [Fact]
        public void GetRolesFromClaims_ReturnsEmptyListIfNoRolesFound()
        {
            // Act
            var claimsResult = _claimsHelper.GetRolesFromClaims(GetInvalidIdentity(false));

            // Assert: Check return type
            Assert.NotNull(claimsResult);
            Assert.IsAssignableFrom<IList<AzureRoleDto>>(claimsResult);

            // Assert: Check payload
            Assert.Empty(claimsResult);
        }

        private ClaimsIdentity GetValidIdentity()
        {
            return new ClaimsIdentity(
                new List<Claim>()
                {
                    new Claim(ClaimTypes.Upn, _defaultEmail),
                    new Claim(NameClaimType, _defaultName),
                    new Claim(ClaimTypes.Role, "ManagementInternal"),
                    new Claim(ClaimTypes.Role, "UnknownRole"),
                }
            );
        }

        private ClaimsIdentity GetInvalidIdentity(bool isUpnMissing)
        {
            return new ClaimsIdentity(
                new List<Claim>()
                {
                    isUpnMissing ? new Claim(NameClaimType, _defaultName) : new Claim(ClaimTypes.Upn, _defaultEmail)
                }
            );
        }
    }
}