using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace OKTemplate.Api.Authorization
{
    /// <inheritdoc cref="AuthorizationHandler" />
    public class RolesHandler : AuthorizationHandler<RoleRequirement>
    {
        /// <inheritdoc />
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, RoleRequirement requirement)
        {
            if (requirement.RoleOperator == RoleOperator.And)
            {
                foreach (var role in requirement.Roles)
                {
                    if (!context.User.HasClaim(RoleRequirement.ClaimType, role.ToString()))
                    {
                        // If the user lacks any of the required roles, the policy fails
                        context.Fail();
                        return Task.CompletedTask;
                    }
                }

                context.Succeed(requirement);
                return Task.CompletedTask;
            }

            foreach (var role in requirement.Roles)
            {
                if (context.User.HasClaim(RoleRequirement.ClaimType, role.ToString()))
                {
                    // If the user has any of the required roles, the policy succeeds
                    context.Succeed(requirement);
                    return Task.CompletedTask;
                }
            }

            context.Fail();
            return Task.CompletedTask;
        }
    }
}