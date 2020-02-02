using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Dtos
{
    public class SavePlanDto
    {
        [Required] public string Trade { get; set; }
        [Required] public string Level { get; set; }
        [Required] public string Language { get; set; }
        [Required] public string SyllabusName { get; set; }
        public IFormFile SyllabusFile { get; set; }
        public IFormFile TestPlanFile { get; set; }
        [Required] public string DevOfficer { get; set; }
        [Required] public string Manager { get; set; }
        [Required] public DateTime ActiveDate { get; set; }
    }
}
