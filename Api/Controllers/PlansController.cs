using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Core.Abstruct.Base;
using Core.Dtos;
using Core.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
        public async Task<IActionResult> GetPlan(int rowsPerPage = 10, int pageNumber = 1)
        {
            return Content(JsonConvert.SerializeObject(await unitOfWork.PlanRepository.GetAllPlans(rowsPerPage, pageNumber)));
        }

        [HttpPost]
        [Route("save")]
        public async Task<IActionResult> SavePlan([FromForm] SavePlanDto dto)
        {
            var dir = Path.Combine(webHostEnvironment.WebRootPath, "files");

            var model = new Plans
            {
                Trade = dto.Trade,
                Level = dto.Level,
                Language = dto.Language,
                SyllabusName = dto.SyllabusName,
                DevOfficer = dto.DevOfficer,
                Manager = dto.Manager,
                ActiveDate = dto.ActiveDate
            };

            if (dto.SyllabusFile != null)
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

        [HttpDelete]
        [Route("delete/{planId}")]
        public IActionResult DeletePlan(long planId)
        {
            unitOfWork.PlanRepository.Delete(x => x.Id == planId);
            unitOfWork.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdatePlan([FromForm] UpdatePlanDto dto)
        {
            var dir = Path.Combine(webHostEnvironment.WebRootPath, "files");
            var oldPlan = await unitOfWork.PlanRepository.GetAsync(x => x.Id == dto.Id);

            oldPlan.Trade = dto.Trade ?? oldPlan.Trade;
            oldPlan.Level = dto.Level ?? oldPlan.Level;
            oldPlan.Language = dto.Language ?? oldPlan.Language;
            oldPlan.SyllabusName = dto.SyllabusName ?? oldPlan.SyllabusName;
            oldPlan.DevOfficer = dto.DevOfficer ?? oldPlan.DevOfficer;
            oldPlan.Manager = dto.Manager ?? oldPlan.Manager;
            oldPlan.ActiveDate = dto.ActiveDate <= new DateTime(1901, 1, 1) ? oldPlan.ActiveDate : dto.ActiveDate;

            if (dto.SyllabusFile != null)
            {
                //create new file
                var fileName = $"{Guid.NewGuid().ToString("N")}_{dto.SyllabusFile.FileName}";
                await dto.SyllabusFile.CopyToAsync(new FileStream(Path.Combine(dir, fileName), FileMode.Create));

                //delete old file
                if (!string.IsNullOrEmpty(oldPlan.SyllabusFile) && System.IO.File.Exists(Path.Combine(dir, oldPlan.SyllabusFile))) System.IO.File.Delete(Path.Combine(dir, oldPlan.SyllabusFile));

                //save new filename
                oldPlan.SyllabusFile = fileName;
            }
            if (dto.TestPlanFile != null)
            {
                //create new file
                var fileName = $"{Guid.NewGuid().ToString("N")}_{dto.TestPlanFile.FileName}";
                await dto.TestPlanFile.CopyToAsync(new FileStream(Path.Combine(dir, fileName), FileMode.Create));

                //delete old file
                if (!string.IsNullOrEmpty(oldPlan.TestPlanFile) && System.IO.File.Exists(Path.Combine(dir, oldPlan.TestPlanFile))) System.IO.File.Delete(Path.Combine(dir, oldPlan.TestPlanFile));

                //save new filename
                oldPlan.TestPlanFile = fileName;
            }

            unitOfWork.PlanRepository.Update(oldPlan);
            await unitOfWork.SaveChangesAsync();

            return Ok();
        }
    }
}