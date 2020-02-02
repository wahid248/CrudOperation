using Data.Configuration;
using Microsoft.EntityFrameworkCore;

namespace Data.Base
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            EntityConfigurationManager.Configure(builder);
        }
    }
}
