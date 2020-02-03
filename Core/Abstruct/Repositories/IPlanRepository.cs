using Core.Abstruct.Base;
using Core.Dtos;
using Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Abstruct.Repositories
{
    public interface IPlanRepository : IRepository<Plans, long>
    {
        Task<List<GetPlansDto>> GetAllPlans(int rowsPerPage, int pageNumber);
    }
}
