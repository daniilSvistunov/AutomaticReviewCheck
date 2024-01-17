using NLog;

namespace OKTemplate.Common.Logging
{
    /// <inheritdoc cref="ILoggerManager" />
    public class LoggerManager : ILoggerManager
    {
        private static readonly ILogger _logger = LogManager.GetCurrentClassLogger();

        /// <inheritdoc />
        public void LogDebug(string message)
        {
            _logger.Debug(message);
        }

        /// <inheritdoc />
        public void LogInfo(string message)
        {
            _logger.Info(message);
        }

        /// <inheritdoc />
        public void LogWarning(string message)
        {
            _logger.Warn(message);
        }

        /// <inheritdoc />
        public void LogError(string message)
        {
            _logger.Error(message);
        }
    }
}