using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using ToDoList.Common.Logging;

namespace ToDoList.Api.WorkerServices
{
    public class NotificationQueueWorkerService : BackgroundService
    {
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public NotificationQueueWorkerService(ILoggerManager logger, IMapper mapper, IConfiguration configuration)
        {
            _logger = logger;
            _mapper = mapper;
            _configuration = configuration;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInfo($"{nameof(NotificationQueueWorkerService)} running at: {DateTimeOffset.UtcNow.ToLocalTime()}");

                PerformTasks();

                await SleepUntilNextCycle(stoppingToken);
            }
        }

        private async Task SleepUntilNextCycle(CancellationToken stoppingToken)
        {
            // calculate next cycle
            var (nextCycleDateTime, nextCycleDelay) = CalculateNextCycle();
            _logger.LogInfo($"next cycle will be at {nextCycleDateTime.ToLocalTime()} in about {nextCycleDelay}[ms]");

            // sleep until next cycle
            await Task.Delay(nextCycleDelay, stoppingToken);
        }

        private void PerformTasks()
        {
            try
            {
                // implement here
            }
            catch (Exception ex)
            {
                // we log, but we won't stop trying
                _logger.LogError("exception while performing tasks", ex);
            }
        }

        private static (DateTime nextCycleDateTime, int nextCycleDelay) CalculateNextCycle()
        {
            var now = DateTime.UtcNow;
            var nextCycle = now.AddHours(1);
            nextCycle = new DateTime(nextCycle.Year, nextCycle.Month, nextCycle.Day, nextCycle.Hour, 0, 0, DateTimeKind.Utc);
            return (nextCycle, (int)(nextCycle - now).TotalMilliseconds);
        }
    }
}
