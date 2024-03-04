using System.ComponentModel.DataAnnotations;

namespace ToDoList.BusinessLayer.Dtos
{
    public class ToDoItemDto
    {
        public long id { get; set; }

        [Required(ErrorMessage = "A title is required")]
        public string? task { get; set; }

        [Required(ErrorMessage = "A state is required")]
        public bool state { get; set; }

        [RegularExpression(@"^([0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9])$")]
        public string? date { get; set; }
    }
}
