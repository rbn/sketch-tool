using SketchTool.Api.Contracts;
using SketchTool.Api.Models;

namespace SketchTool.Api.Services
{
   public class StudyService : IStudyService
   {
      public Task<Study> CreateAsync(CreateStudyRequest request)
      {
         var now = DateTimeOffset.UtcNow;

         var study = new Study
         {
            Id = Guid.NewGuid(),
            Name = request.Name,
            CreatedAt = now,
            UpdatedAt = now,
            Mode = request.Mode
         };
         return Task.FromResult(study);
      }
   }
}
