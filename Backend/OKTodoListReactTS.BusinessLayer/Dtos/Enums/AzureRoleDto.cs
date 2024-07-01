using System.Text.Json.Serialization;

namespace OKTodoListReactTS.BusinessLayer.Dtos.Enums
{
    /// <summary>
    /// Roles that are defined in AzureAD, for more information see: 
    /// https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/AppRoles/appId/042e40ca-f88b-4649-82ce-8e2e34e36788/isMSAApp/
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum AzureRoleDto
    {
        ManagementInternal = 0,
        SalesOperational = 1,
        ManagementOperational = 2
    }
}