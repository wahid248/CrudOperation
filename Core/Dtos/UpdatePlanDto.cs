using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos
{
    public class UpdatePlanDto
    {
        [Required] public long Id { get; set; }
        public string Trade { get; set; }
        public string Level { get; set; }
        public string Language { get; set; }
        public string SyllabusName { get; set; }
        public IFormFile SyllabusFile { get; set; }
        public IFormFile TestPlanFile { get; set; }
        public string DevOfficer { get; set; }
        public string Manager { get; set; }
        public DateTime ActiveDate { get; set; }
    }
}
