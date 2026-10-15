using SketchTool.Api.Models;
using System.Collections.Concurrent;

namespace SketchTool.Api.Repositories
{
   public class InMemoryStudyRepository: IStudyRepository
   {
      private readonly ConcurrentDictionary<Guid, Study> _studies = new();

      public Task<Study> CreateAsync(Study study)
      {
         if (!_studies.TryAdd(study.Id, study))
         {
            throw new InvalidOperationException($"Study with ID {study.Id} already exists.");
         }

         return Task.FromResult(study);
      }

      public Task<Study?> GetByIdAsync(Guid studyId)
      {
         if (_studies.TryGetValue(studyId, out var study))
         {
            return Task.FromResult<Study?>(study);
         }

         return Task.FromResult<Study?>(null);
      }
   }
}
