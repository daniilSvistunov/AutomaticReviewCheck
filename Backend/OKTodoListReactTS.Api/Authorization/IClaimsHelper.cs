using System.Collections.Generic;
using System.Security.Principal;
using OKTodoListReactTS.BusinessLayer.Dtos.Enums;

namespace OKTodoListReactTS.Api.Authorization
{
    /// <summary>
    /// Reads information from claims
    /// </summary>
    public interface IClaimsHelper
    {
        /// <summary>
        /// Reads the upn from a given identity
        /// </summary>
        /// <param name="claims">The identity to look through</param>
        /// <returns>The user's upn as string (<c>null</c> if identity has no upn)</returns>
        string? GetUpnFromClaims(IIdentity claims);

        /// <summary>
        /// Reads a name from a given identity
        /// </summary>
        /// <param name="claims">The identity to look through</param>
        /// <returns>The user's name as string (<c>null</c> if identity has no name)</returns>
        string? GetNameFromClaims(IIdentity claims);

        /// <summary>
        /// Reads all the roles from a given identity
        /// </summary>
        /// <param name="claims">The identity to look through</param>
        /// <returns>The user's roles as list (empty list if identity has no roles assigned)</returns>
        IList<AzureRoleDto> GetRolesFromClaims(IIdentity claims);
    }
}