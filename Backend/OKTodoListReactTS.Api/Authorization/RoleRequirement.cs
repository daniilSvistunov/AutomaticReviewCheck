using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using OKTemplate.Common.Exceptions;
using OKTodoListReactTS.BusinessLayer.Dtos.Enums;
using OKTodoListReactTS.Common.Exceptions;

namespace OKTodoListReactTS.Api.Authorization
{
    /// <inheritdoc cref="IAuthorizationRequirement" />
    public class RoleRequirement : IAuthorizationRequirement
    {
        /// <summary>
        /// The <see cref="ClaimTypes"/> needed to fulfill the requirement
        /// </summary>
        public static string ClaimType => ClaimTypes.Role;

        public RoleOperator RoleOperator { get; }

        public AzureRoleDto[] Roles { get; }

        public RoleRequirement(RoleOperator roleOperator, AzureRoleDto[] roles)
        {
            if (roles.Length == 0)
            {
                throw new ApiException(HttpStatusCode.Forbidden, ErrorCode.MissingOrWrongRoles);
            }

            RoleOperator = roleOperator;
            Roles = roles;
        }
    }
}