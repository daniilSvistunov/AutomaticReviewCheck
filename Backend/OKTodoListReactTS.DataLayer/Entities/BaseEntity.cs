using System;
using System.ComponentModel.DataAnnotations;
using OKTemplate.DataLayer.Helpers;

namespace OKTemplate.DataLayer.Entities
{
    /// <summary>
    /// Describes a <see cref="BaseEntity"/>
    /// </summary>
    public class BaseEntity
    {
        /// <summary>
        /// The unique key of the <see cref="BaseEntity"/>
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// The creation date and time of the models
        /// </summary>
        public DateTime CreatedOn { get; set; }

        /// <summary>
        /// The updated date and time of the models
        /// </summary>
        public DateTime UpdatedOn { get; set; }

        /// <summary>
        /// The optional name of the person who created the <see cref="BaseEntity"/>
        /// </summary>
        [StringLength(StringLengthVariables.Small)]
        public string? CreatedBy { get; set; }

        /// <summary>
        /// The optional name of the person who updated the <see cref="BaseEntity"/>
        /// </summary>
        [StringLength(StringLengthVariables.Small)]
        public string? UpdatedBy { get; set; }
    }
}