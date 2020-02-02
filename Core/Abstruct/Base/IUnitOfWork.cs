using Core.Abstruct.Repositories;
using System;
using System.Threading.Tasks;

namespace Core.Abstruct.Base
{
    public interface IUnitOfWork : IDisposable
    {
        void SaveChanges();
        Task SaveChangesAsync();

        IPlanRepository PlanRepository { get; }
    }
}
