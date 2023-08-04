namespace LicentaApi.Models
{
    public class Product
    {
        public long Id { get; set; }

        public long? UserId { get; set; }
        public string? Title { get; set; }
        public byte[]? Image { get; set; }

        public long? CategoryId { get; set; }

        public long? Price { get; set; }

        public string? Text { get; set; }

        public List<Overbidding>? Overbiddings { get; set; }

       

        public int? View {get; set; }

        public DateTime? StartingDate { get; set; }

        public DateTime? ExpirationDate { get; set; }

    }
}