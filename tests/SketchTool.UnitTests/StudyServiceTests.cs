using Xunit;
using SketchTool.Api.Contracts;
using SketchTool.Api.Models;
using SketchTool.Api.Services;
using SketchTool.Api.Repositories;

namespace SketchTool.UnitTests;

public class StudyServiceTests
{
   [Fact]
   public async Task CreateAsync_ShouldCopyNameAndMode()
   {
      // Arrange
      InMemoryStudyRepository repo = new InMemoryStudyRepository();
      var service = new StudyService(repo);

      var request = new CreateStudyRequest
      {
         Name = "Portrait Study",
         Mode = StudyMode.Overlay
      };

      // Act
      var before = DateTimeOffset.UtcNow;

      var study = await service.CreateAsync(request);

      var after = DateTimeOffset.UtcNow;

      // Assert
      Assert.Equal(request.Name, study.Name);
      Assert.Equal(request.Mode, study.Mode);
      Assert.NotEqual(Guid.Empty, study.Id);
      Assert.InRange(study.CreatedAt, before, after);
      Assert.Equal(study.CreatedAt, study.UpdatedAt);
   }

   [Fact]
   public async Task GetByIdAsync_ShouldReturnExistingStudy()
   {
      // Arrange
      var repo = new InMemoryStudyRepository();
      var service = new StudyService(repo);

      var request = new CreateStudyRequest
      {
         Name = "Landscape Study",
         Mode = StudyMode.SideBySide
      };

      // Act
      var created = await service.CreateAsync(request);
      var fetched = await service.GetByIdAsync(created.Id);

      // Assert
      Assert.NotNull(fetched);
      Assert.Equal(created.Id, fetched!.Id);
      Assert.Equal(created.Name, fetched.Name);
      Assert.Equal(created.Mode, fetched.Mode);
      Assert.Equal(created.CreatedAt, fetched.CreatedAt);
      Assert.Equal(created.UpdatedAt, fetched.UpdatedAt);
   }


   [Fact]
   public async Task GetByIdAsync_ShouldReturnNull_WhenStudyDoesNotExist()
   {
      // Arrange
      var repo = new InMemoryStudyRepository();
      var service = new StudyService(repo);

      // Act
      var fetched = await service.GetByIdAsync(Guid.NewGuid());

      // Assert
      Assert.Null(fetched);
   }
}
