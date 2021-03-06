﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos
{
    public class GetPlansDto
    {
        public long Id { get; set; }
        public string Trade { get; set; }
        public string Level { get; set; }
        public string Language { get; set; }
        public string SyllabusName { get; set; }
        public string SyllabusFile { get; set; }
        public string TestPlanFile { get; set; }
        public string DevOfficer { get; set; }
        public string Manager { get; set; }
        public DateTime ActiveDate { get; set; }
    }
}
