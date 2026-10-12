using SketchTool.Api.Models;

namespace SketchTool.Api.Contracts
{
    public class CreateStudyRequest
    {
        public required string Name { get; set; }
        public required StudyMode Mode { get; set; }
    }
}
