using System;

namespace ToDoList.BusinessLayer.Dtos
{
    /// <summary>
    /// Represents a basic wrapper for data transfer objects.
    /// </summary>
    public abstract class BaseDto
    {
        /// <summary>
        /// The database id of the object.
        /// </summary>
        public Guid? Id { get; set; }
    }
}
