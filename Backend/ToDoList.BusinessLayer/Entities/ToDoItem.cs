namespace ToDoList.BusinessLayer.Entities
{
    public class ToDoItem
    {
        public long id { get; set; }
        public string? task { get; set; }
        public bool isComplete { get; set; }
        public string? dueDate { get; set; }
    }
}
