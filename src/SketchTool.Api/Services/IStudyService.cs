using SketchTool.Api.Contracts;
using SketchTool.Api.Models;

namespace SketchTool.Api.Services
{
   public interface IStudyService
   {
      public Task<Study> CreateAsync(CreateStudyRequest request);
      public Task<Study?> GetByIdAsync(Guid studyId);



   }
}
