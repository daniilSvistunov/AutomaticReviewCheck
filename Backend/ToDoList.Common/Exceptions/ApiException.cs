using System.Net;
using System.Runtime.Serialization;

namespace ToDoList.Common.Exceptions
{

    /// <inheritdoc />
    [Serializable]
    public class ApiException : Exception
    {
        public HttpStatusCode StatusCode { get; }
        public ErrorCode ErrorCode { get; }

        public ApiException(HttpStatusCode statusCode, ErrorCode errorCode)
        {
            StatusCode = statusCode;
            ErrorCode = errorCode;
        }

        /// <inheritdoc />
        public ApiException(string message)
            : base(message)
        {
        }

        /// <inheritdoc />
        public ApiException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        /// <inheritdoc />
        protected ApiException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}