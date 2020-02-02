using CrudOperation.Core.Abstruct.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CrudOperation.Data.Base
{
    public class EntityConfigurationBase<TEntity, T> : IEntityTypeConfiguration<TEntity> where TEntity : class, IEntity<T>
    {
        public virtual void Configure(EntityTypeBuilder<TEntity> builder)
        {
            builder.HasQueryFilter(p => !p.IsDeleted);
        }
    }
}
