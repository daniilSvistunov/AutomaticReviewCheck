using System.Text.Json.Serialization;
using OKTodoListReactTS.Common.Exceptions;

namespace OKTodoListReactTS.Api.ErrorHandling
{
    /// <summary>
    /// Contains information about occurred errors
    /// </summary>
    public class ErrorDetails
    {
        [JsonPropertyName("statusCode")]
        public int StatusCode { get; set; }

        [JsonPropertyName("errorCode")]
        public ErrorCode ErrorCode { get; set; }
    }
}