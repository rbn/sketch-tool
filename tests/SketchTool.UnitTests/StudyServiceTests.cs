using Xunit;
using SketchTool.Api.Contracts;
using SketchTool.Api.Models;
using SketchTool.Api.Services;

namespace SketchTool.UnitTests;

public class StudyServiceTests
{
   [Fact]
   public async Task CreateAsync_ShouldCopyNameAndMode()
   {
      // Arrange
      var service = new StudyService();

      var request = new CreateStudyRequest
      {
         Name = "Portrait Study",
         Mode = StudyMode.Overlay
      };

      // Act
      var study = await service.CreateAsync(request);

      // Assert
      Assert.Equal(request.Name, study.Name);
      Assert.Equal(request.Mode, study.Mode);
   }
}