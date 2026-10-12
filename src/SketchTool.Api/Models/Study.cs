namespace SketchTool.Api.Models
{
    public class Study
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
        public required StudyMode Mode { get; set; }

        
    }
}
