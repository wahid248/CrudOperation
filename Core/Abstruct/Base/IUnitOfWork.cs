using System;
using System.Threading.Tasks;

namespace CrudOperation.Core.Abstruct.Base
{
    public interface IUnitOfWork : IDisposable
    {
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
