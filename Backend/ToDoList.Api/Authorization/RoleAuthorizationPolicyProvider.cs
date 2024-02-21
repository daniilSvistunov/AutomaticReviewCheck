using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using ToDoList.BusinessLayer.Dtos.Enums;

namespace ToDoList.Api.Authorization
{
    /// <inheritdoc cref="DefaultAuthorizationPolicyProvider" />
    public class RolesAuthorizationPolicyProvider : DefaultAuthorizationPolicyProvider
    {
        public RolesAuthorizationPolicyProvider(IOptions<AuthorizationOptions> options) : base(options) { }

        /// <inheritdoc />
        public override async Task<AuthorizationPolicy?> GetPolicyAsync(string policyName)
        {
            if (!policyName.StartsWith(RolesAuthorizeAttribute.PolicyPrefix, StringComparison.OrdinalIgnoreCase))
            {
                // If none of our custom policy is used, fall back to the default policy handling
                return await base.GetPolicyAsync(policyName);
            }

            RoleOperator @operator = RolesAuthorizeAttribute.GetOperatorFromPolicy(policyName);
            AzureRoleDto[] roles = RolesAuthorizeAttribute.GetRolesFromPolicy(policyName);

            // Extract the info from our policy name and create the requirement
            var requirement = new RoleRequirement(@operator, roles);

            // Add the requirement to the policy builder
            return new AuthorizationPolicyBuilder().AddRequirements(requirement).Build();
        }
    }
}