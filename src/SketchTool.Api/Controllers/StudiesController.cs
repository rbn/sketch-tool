using Microsoft.AspNetCore.Mvc;
using SketchTool.Api.Contracts;
using SketchTool.Api.Services;

namespace SketchTool.Api.Controllers
{
   [ApiController]
   [Route("api/[controller]")]
   public class StudiesController : ControllerBase
   {
      private readonly IStudyService _studyService;
      public StudiesController(IStudyService studyService)
      {
         this._studyService = studyService;
      }

      [HttpPost]
      public async Task<ActionResult>  Create([FromBody] CreateStudyRequest request)
      {
         var study = await _studyService.CreateAsync(request);
         return CreatedAtAction(
          nameof(GetById),
          new { id = study.Id },
          study);
      }

      [HttpGet("{id}")]
      public async Task<ActionResult> GetById([FromRoute] Guid id)
      {
         var study = await _studyService.GetByIdAsync(id);
         if (study == null)
         {
            return NotFound();
         }

         return Ok(study);
      }
   }
}
