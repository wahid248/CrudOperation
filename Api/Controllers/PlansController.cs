using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Core.Abstruct.Base;
using Core.Dtos;
using Core.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlansController : ControllerBase
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IUnitOfWork unitOfWork;

        public PlansController(IWebHostEnvironment webHostEnvironment, IUnitOfWork unitOfWork)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("get")]
        public IActionResult GetPlan()
        {
            return Ok();
        }

        [HttpPost]
        [Route("save")]
        public async Task<IActionResult> SavePlan(SavePlanDto dto)
        {
            var dir = Path.Combine(webHostEnvironment.WebRootPath, "files");

            var model = new Plans
            {
                Trade = dto.Trade,
                Level = dto.Level,
                Language = dto.Language,
                SyllabusName = dto.SyllabusName,
                DevOfficer = dto.DevOfficer,
                Manager = dto.Manager
            };

            if(dto.SyllabusFile != null)
            {
                var fileName = $"{Guid.NewGuid().ToString("N")}_{dto.SyllabusFile.FileName}";
                await dto.SyllabusFile.CopyToAsync(new FileStream(Path.Combine(dir, fileName), FileMode.Create));
                model.SyllabusFile = fileName;
            }
            if (dto.TestPlanFile != null)
            {
                var fileName = $"{Guid.NewGuid().ToString("N")}_{dto.TestPlanFile.FileName}";
                await dto.TestPlanFile.CopyToAsync(new FileStream(Path.Combine(dir, fileName), FileMode.Create));
                model.TestPlanFile = fileName;
            }

            await unitOfWork.PlanRepository.AddAsync(model);
            await unitOfWork.SaveChangesAsync();

            return Ok();
        }
    }
}