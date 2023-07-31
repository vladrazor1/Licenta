using LicentaApi.Models;

namespace LicentaApi.Models
{
    public class Category
    {
        public long Id { get; set; }

        public string? Name { get; set; }
        public string? Description { get; set; }
        public List<Product>? Products { get; set; }
    }
}