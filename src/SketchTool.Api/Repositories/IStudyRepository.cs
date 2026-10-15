using SketchTool.Api.Models;

namespace SketchTool.Api.Repositories
{
   public interface IStudyRepository
   {
      Task<Study> CreateAsync(Study study);

      Task<Study?> GetByIdAsync(Guid studyId);

   }
}
