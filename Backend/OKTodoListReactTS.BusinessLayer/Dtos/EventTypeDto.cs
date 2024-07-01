using System;

namespace OKTodoListReactTS.BusinessLayer.Dtos
{
    public class EventTypeDto : BaseDto
    {
        public Guid ApplicationId { get; set; }

        public string EventTypeName { get; set; } = null!;

        public string? ApplicationName { get; set; }
    }
}
