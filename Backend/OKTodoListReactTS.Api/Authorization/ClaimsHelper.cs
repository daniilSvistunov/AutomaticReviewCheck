using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Security.Claims;
using System.Security.Principal;
using OKTemplate.BusinessLayer.Dtos.Enums;

namespace OKTemplate.Api.Authorization
{
    /// <inheritdoc cref="IClaimsHelper" />
    public class ClaimsHelper : IClaimsHelper
    {
        /// <inheritdoc />
        public string? GetUpnFromClaims(IIdentity claims)
        {
            if (claims is ClaimsIdentity claimsIdentity)
            {
                return claimsIdentity.FindFirst(ClaimTypes.Upn)?.Value;
            }

            return null;
        }

        /// <inheritdoc />
        public string? GetNameFromClaims(IIdentity claims)
        {
            if (claims is ClaimsIdentity claimsIdentity)
            {
                return claimsIdentity.FindFirst(x => "name".Equals(x.Type))?.Value;
            }

            return null;
        }

        /// <inheritdoc />
        public IList<AzureRoleDto> GetRolesFromClaims(IIdentity claims)
        {
            var roles = new Collection<AzureRoleDto>();

            if (claims is ClaimsIdentity claimsIdentity)
            {
                var matchingClaims = claimsIdentity.FindAll(ClaimTypes.Role);

                foreach (var claim in matchingClaims)
                {
                    if (Enum.TryParse(claim.Value, out AzureRoleDto roleClaim))
                    {
                        roles.Add(roleClaim);
                    }
                }
            }

            return roles;
        }
    }
}
