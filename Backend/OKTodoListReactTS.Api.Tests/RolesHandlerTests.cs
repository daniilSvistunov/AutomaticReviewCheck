using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using OKTodoListReactTS.Api.Authorization;
using OKTodoListReactTS.BusinessLayer.Dtos.Enums;
using Xunit;

namespace OKTodoListReactTS.Api.Tests
{
    /// <summary>
    /// Runs tests against the <see cref="RolesHandler"/>
    /// </summary>
    public class RolesHandlerTests
    {
        [Fact]
        public async Task OrOperator_FailsIfRoleIsMissing()
        {
            // Arrange: Collect requirements   
            var requirements = new[] { new RoleRequirement(RoleOperator.Or,
                new[] { AzureRoleDto.ManagementInternal, AzureRoleDto.ManagementOperational }) };

            var user = new ClaimsPrincipal(
                new ClaimsIdentity(
                    new[] { new Claim(ClaimTypes.Role, AzureRoleDto.SalesOperational.ToString()) },
                    "Basic")
            );

            AuthorizationHandlerContext context = new(requirements, user, null);
            var subject = new RolesHandler();

            // Act: Handle authorization requirement
            await subject.HandleAsync(context);

            // Assert: Authorization should have failed
            Assert.False(context.HasSucceeded);
        }

        [Fact]
        public async Task OrOperator_SucceedsIfOneRoleFulfillsRequirements()
        {
            // Arrange: Collect requirements   
            var requirements = new[] { new RoleRequirement(RoleOperator.Or,
                new[] { AzureRoleDto.ManagementInternal, AzureRoleDto.ManagementOperational }) };

            var user = new ClaimsPrincipal(
                new ClaimsIdentity(
                    new[] { new Claim(ClaimTypes.Role, AzureRoleDto.SalesOperational.ToString()),
                            new Claim(ClaimTypes.Role, AzureRoleDto.ManagementOperational.ToString()),
                    },
                    "Basic")
            );

            AuthorizationHandlerContext context = new(requirements, user, null);
            var subject = new RolesHandler();

            // Act: Handle authorization requirement
            await subject.HandleAsync(context);

            // Assert: Authorization should have failed
            Assert.True(context.HasSucceeded);
        }

        [Fact]
        public async Task OrOperator_FailsIfNoRoleIsGiven()
        {
            // Arrange: Collect requirements   
            var requirements = new[] { new RoleRequirement(RoleOperator.Or,
                new[] { AzureRoleDto.ManagementInternal, AzureRoleDto.ManagementOperational }) };

            var user = new ClaimsPrincipal(
                new ClaimsIdentity(Array.Empty<Claim>(), "Basic")
            );

            AuthorizationHandlerContext context = new(requirements, user, null);
            var subject = new RolesHandler();

            // Act: Handle authorization requirement
            await subject.HandleAsync(context);

            // Assert: Authorization should have failed
            Assert.False(context.HasSucceeded);
        }

        [Fact]
        public async Task AndOperator_FailsIfNoRoleIsGiven()
        {
            // Arrange: Collect requirements   
            var requirements = new[] { new RoleRequirement(RoleOperator.And,
                new[] { AzureRoleDto.ManagementInternal, AzureRoleDto.ManagementOperational }) };

            var user = new ClaimsPrincipal(
                new ClaimsIdentity(Array.Empty<Claim>(), "Basic")
            );

            AuthorizationHandlerContext context = new(requirements, user, null);
            var subject = new RolesHandler();

            // Act: Handle authorization requirement
            await subject.HandleAsync(context);

            // Assert: Authorization should have failed
            Assert.False(context.HasSucceeded);
        }

        [Fact]
        public async Task AndOperator_FailsIfRoleIsMissing()
        {
            // Arrange: Collect requirements   
            var requirements = new[] { new RoleRequirement(RoleOperator.And,
                new[] { AzureRoleDto.ManagementInternal, AzureRoleDto.ManagementOperational }) };

            var user = new ClaimsPrincipal(
                new ClaimsIdentity(
                    new[] { new Claim(ClaimTypes.Role, AzureRoleDto.SalesOperational.ToString()),
                            new Claim(ClaimTypes.Role, AzureRoleDto.ManagementOperational.ToString()),
                    },
                    "Basic")
            );

            AuthorizationHandlerContext context = new(requirements, user, null);
            var subject = new RolesHandler();

            // Act: Handle authorization requirement
            await subject.HandleAsync(context);

            // Assert: Authorization should have failed
            Assert.False(context.HasSucceeded);
        }

        [Fact]
        public async Task AndOperator_SucceedsIfAllRolesAreGiven()
        {
            // Arrange: Collect requirements   
            var requirements = new[] { new RoleRequirement(RoleOperator.And,
                new[] { AzureRoleDto.SalesOperational, AzureRoleDto.ManagementOperational }) };

            var user = new ClaimsPrincipal(
                new ClaimsIdentity(
                    new[] { new Claim(ClaimTypes.Role, AzureRoleDto.SalesOperational.ToString()),
                            new Claim(ClaimTypes.Role, AzureRoleDto.ManagementOperational.ToString()),
                    },
                    "Basic")
            );

            AuthorizationHandlerContext context = new(requirements, user, null);
            var subject = new RolesHandler();

            // Act: Handle authorization requirement
            await subject.HandleAsync(context);

            // Assert: Authorization should have failed
            Assert.True(context.HasSucceeded);
        }
    }
}