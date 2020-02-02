using Core.Abstruct.Repositories;
using Core.Entities;
using Data.Base;

namespace Data.Repositories
{
    public class PlanRepository : Repository<Plans, long>, IPlanRepository
    {
        public PlanRepository(DataContext dbContext) : base(dbContext)
        {

        }
    }
}
