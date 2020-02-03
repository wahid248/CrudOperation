using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class FilesController : Controller
    {
        private readonly IWebHostEnvironment webHostEnvironment;

        public FilesController(IWebHostEnvironment webHostEnvironment)
        {
            this.webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        [Route("get/{fileName}")]
        public IActionResult GetFile(string fileName)
        {
            using var provider = new PhysicalFileProvider(Path.Combine(webHostEnvironment.WebRootPath, "files"));
            IFileInfo fileInfo = provider.GetFileInfo(fileName);
            var readStream = fileInfo.CreateReadStream();
            var contentType = "application/octet-stream";
            return File(readStream, contentType, fileName);
        }
    }
}