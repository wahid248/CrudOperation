using System;
using System.ComponentModel.DataAnnotations;

namespace CrudOperation.Core.Abstruct.Base
{
    public interface IEntity<T> : IValidatableObject
    {
        public T Id { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
    }
}
