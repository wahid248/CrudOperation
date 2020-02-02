using System;
using System.Threading.Tasks;
using CrudOperation.Core.Abstruct.Base;

namespace CrudOperation.Data.Base
{
    public class UnitOfWork : IUnitOfWork
    {
        protected readonly DataContext context;
        private bool isDisposed = false;

        public UnitOfWork(DataContext appDbContext)
        {
            context = appDbContext;
        }

        public void Dispose(bool disposing)
        {
            if (!isDisposed) return;
            if (disposing)
            {
                //free managed resources
                this.Dispose();
            }

            //free unmanaged resources
            isDisposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        public void SaveChanges()
        {
            context.SaveChanges();
        }
        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
