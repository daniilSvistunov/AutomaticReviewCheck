using System;

namespace OKTemplate.BusinessLayer.Dtos
{
    public class TaskDto : BaseDto
    {
        /// <summary>
        /// The database id of the object.
        /// </summary>
        public Guid TaskId { get; set; }
    }
}
