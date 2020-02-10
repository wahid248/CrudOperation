using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Abstruct.Repositories;
using Core.Dtos;
using Core.Entities;
using Data.Base;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
    public class PlanRepository : Repository<Plans, long>, IPlanRepository
    {
        public PlanRepository(DataContext dbContext) : base(dbContext)
        {

        }

        public async Task<List<GetPlansDto>> GetAllPlans(int rowsPerPage, int pageNumber)
        {
            return await _dbSet
                .Skip((pageNumber - 1) * rowsPerPage)
                .Take(rowsPerPage)
                .Select(x => new GetPlansDto
                {
                    Id = x.Id,
                    Trade = x.Trade,
                    Level = x.Level,
                    Language = x.Language,
                    SyllabusName = x.SyllabusName,
                    SyllabusFile = x.SyllabusFile,
                    TestPlanFile = x.TestPlanFile,
                    DevOfficer = x.DevOfficer,
                    Manager = x.Manager,
                    ActiveDate = x.ActiveDate
                })
                .ToListAsync();
        }
    }
}
