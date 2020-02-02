using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlansController : ControllerBase
    {
        [HttpGet]
        [Route("get")]
        public IActionResult GetPlan()
        {
            return Ok();
        }

        [HttpPost]
        [Route("save")]
        public IActionResult SavePlan()
        {
            return Ok();
        }
    }
}