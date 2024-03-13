namespace OKTemplate.Common.Logging
{
    /// <summary>
    /// Manages logging within the api
    /// </summary>
    public interface ILoggerManager
    {
        /// <summary>
        /// Logs the given <paramref name="message"/> using the debug severity to a defined target
        /// </summary>
        /// <param name="message">The message to be logged</param>
        void LogDebug(string message);

        /// <summary>
        /// Logs the given <paramref name="message"/> using the info severity to a defined target
        /// </summary>
        /// <param name="message">The message to be logged</param>
        void LogInfo(string message);

        /// <summary>
        /// Logs the given <paramref name="message"/> using the warning severity to a defined target
        /// </summary>
        /// <param name="message">The message to be logged</param>
        void LogWarning(string message);

        /// <summary>
        /// Logs the given <paramref name="message"/> using the error severity to a defined target
        /// </summary>
        /// <param name="message">The message to be logged</param>
        void LogError(string message);
    }
}