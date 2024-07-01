using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using OKTodoListReactTS.Common.Exceptions;
using OKTodoListReactTS.Common.Logging;

namespace OKTodoListReactTS.Api.ErrorHandling
{
    /// <summary>
    /// Extends the <see cref="IApplicationBuilder"/> to use global exception handling
    /// </summary>
    public static class ExceptionMiddlewareExtensions
    {
        /// <summary>
        /// Configures the <paramref name="app"/> to handle exceptions
        /// </summary>
        /// <param name="app">The app that is being configured to use global exception handling</param>
        /// <param name="logger">The logger that is responsible for writing log messages</param>
        public static void ConfigureExceptionHandler(this IApplicationBuilder app, ILoggerManager logger)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    context.Response.ContentType = "application/json";
                    string responseBody = "An unknown error occured. Please check the logs for details.";

                    if (contextFeature?.Error is ApiException plattformException)
                    {
                        context.Response.StatusCode = (int)plattformException.StatusCode;

                        var details = new ErrorDetails()
                        {
                            StatusCode = context.Response.StatusCode,
                            ErrorCode = plattformException.ErrorCode
                        };

                        responseBody = JsonSerializer.Serialize(details);
                    }
                    else
                    {
                        // Log unknown errors to app insights
                        logger.LogError($"Exception Middleware caught an exception: {contextFeature?.Error}");
                    }

                    await context.Response.WriteAsync(responseBody);
                });
            });
        }
    }
}