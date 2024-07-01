using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using OKTodoListReactTS.DataLayer.Helpers;

namespace OKTodoListReactTS.DataLayer.Entities
{
    /// <summary>
    /// Describes a <see cref="EventType"/>
    /// </summary>
    [Table("EventType")]
    public partial class EventType : BaseEntity
    {
        /// <summary>
        /// The azure ad id of the creator of the <see cref="EventType"/>
        /// </summary>
        public Guid ApplicationId { get; set; }

        /// <summary>
        /// The id of the parent <see cref="EventType"/>
        /// </summary>
        [StringLength(StringLengthVariables.Large)]
        public string EventTypeName { get; set; } = null!;

        [ForeignKey(nameof(ApplicationId))]
        public Application? Application { get; set; }

        [NotMapped]
        public string? ApplicationName { get => Application?.AppName; }
    }
}

