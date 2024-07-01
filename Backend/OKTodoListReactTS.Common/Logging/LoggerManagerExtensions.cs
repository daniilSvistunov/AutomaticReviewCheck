using FluentValidation.Results;
using OKTodoListReactTS.Common.Exceptions;

namespace OKTodoListReactTS.Common.Logging
{
    public static class LoggerManagerExtensions
    {
        public static void LogWarning(this ILoggerManager logger, ErrorCode errorCode, string errorMessage)
        {
            logger.LogWarning($"ErrorCode ({(int)errorCode}) {errorCode}: {errorMessage}");
        }

        public static void LogWarning(this ILoggerManager logger, ValidationResult validationResult, string errorMessage)
        {
            if (validationResult.Errors?.Count > 0)
            {
                logger.LogWarning(validationResult.ToString("\n"));
            }
        }

        public static void LogError(this ILoggerManager logger, Exception ex)
        {
            logger.LogError($"{ex.Message}: {ex.StackTrace}");
        }

        public static void LogError(this ILoggerManager logger, string message, Exception ex)
        {
            logger.LogError($"{message}{Environment.NewLine}{ex.Message}: {ex.StackTrace}");
        }
    }
}
