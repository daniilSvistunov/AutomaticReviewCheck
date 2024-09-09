﻿using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace OKTodoListReactTS.DataLayer.Entities
{

    /// <summary>
    /// Describes a <see cref="ToDoEntry"/>
    /// </summary>
    [Table("ToDo")]
    public partial class ToDoEntry : BaseEntity
    {
        public string Text { get; set; }
        public string Titel { get; set; }

        public DateTime TargetDate { get; set; }

        public bool Completed { get; set; }
    }
}

