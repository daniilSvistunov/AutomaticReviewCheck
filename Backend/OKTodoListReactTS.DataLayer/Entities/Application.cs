using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using OKTemplate.DataLayer.Helpers;

namespace OKTemplate.DataLayer.Entities
{

    /// <summary>
    /// Describes a <see cref="Application"/>
    /// </summary>
    [Table("Application")]
    public partial class Application : BaseEntity
    {
        /// <summary>
        /// The azure ad id of the creator of the <see cref="Comment"/>
        /// </summary>
        [StringLength(StringLengthVariables.ExtraSmall)]
        public string AppName { get; set; } = null!;
    }
}

