using SketchTool.Api.Contracts;
using SketchTool.Api.Models;
using SketchTool.Api.Repositories;

namespace SketchTool.Api.Services
{
   public class StudyService : IStudyService
   {
      private readonly IStudyRepository _repository;

      public StudyService(IStudyRepository studyRepository)
      {
         _repository = studyRepository;
      }

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
         return _repository.CreateAsync(study);
      }
      
      public Task<Study?> GetByIdAsync(Guid studyId)
      {
         return _repository.GetByIdAsync(studyId);
      }
   }
}
