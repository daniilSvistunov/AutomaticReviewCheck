using System;

namespace OKTodoListReactTS.BusinessLayer.Dtos
{
    public class ToDoDto : BaseDto
    {
        public Guid Id { get; set; }

        public string Text { get; set; }

        public string Titel { get; set; }

        public DateTime DueDate { get; set; }

        public bool Completed { get; set; }
    }
}
