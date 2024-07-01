using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using OKTodoListReactTS.BusinessLayer.Dtos.Enums;

namespace OKTodoListReactTS.Api.Authorization
{
    /// <inheritdoc cref="AuthorizeAttribute" />
    public class RolesAuthorizeAttribute : AuthorizeAttribute
    {
        internal const string PolicyPrefix = "ROLE_";
        private const string Separator = "_";

        public RolesAuthorizeAttribute(RoleOperator permissionOperator, params AzureRoleDto[] roles)
        {
            // Example: ROLE_1_AdminSuper_AdminHumanResources_Maintainer
            Policy = $"{PolicyPrefix}{(int)permissionOperator}{Separator}{string.Join(Separator, roles)}";
        }

        public RolesAuthorizeAttribute(AzureRoleDto role)
        {
            // Example: ROLE_1_AdminSuper
            Policy = $"{PolicyPrefix}{(int)RoleOperator.And}{Separator}{role}";
        }

        /// <summary>
        /// Gets the Operator from a policy name
        /// </summary>
        /// <param name="policyName">The policy we want to extract the operator from</param>
        /// <returns>The operator as <see cref="RoleOperator"/></returns>
        public static RoleOperator GetOperatorFromPolicy(string policyName)
        {
            var @operator = int.Parse(policyName.AsSpan(PolicyPrefix.Length, 1));
            return (RoleOperator)@operator;
        }

        /// <summary>
        /// Gets all the roles from a policy name
        /// </summary>
        /// <param name="policyName">The policy we want to extract the roles from</param>
        /// <returns>The roles as string array</returns>
        public static AzureRoleDto[] GetRolesFromPolicy(string policyName)
        {
            var roles = policyName[(PolicyPrefix.Length + 2)..].Split(new[] { Separator }, StringSplitOptions.RemoveEmptyEntries);
            return roles.Select(role => Enum.Parse<AzureRoleDto>(role)).ToArray();
        }
    }
}