using LicentaApi.Models;

namespace LicentaApi.Models
{
    public class User
    {
        public long Id { get; set; }

        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public List<Product>? Products { get; set; }
    }
}