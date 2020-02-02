using Core.Abstruct.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    public class EntityBase : IEntity<long>
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime? CreatedOn { get; set; }
        public virtual string CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public virtual string ModifiedBy { get; set; }

        public virtual IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            return new ValidationResult[0];
        }
    }
}
