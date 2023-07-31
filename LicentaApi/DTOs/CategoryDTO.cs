
namespace LicentaApi.DTOs
{
    public class CategoryDTO
    {
        public long Id { get; set; }

        public string? Name { get; set; }
        public string? Description { get; set; }
        public List<ProductDTO>? Products { get; set; }
    }
}