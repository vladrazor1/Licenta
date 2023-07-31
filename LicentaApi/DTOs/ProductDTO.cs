namespace LicentaApi.DTOs
{
    public class ProductDTO
    {
        public long Id { get; set; }

        public long? UserId { get; set; }

        public long? CategoryId { get; set; }

        public long? Price { get; set; }

        public string? Text { get; set; }

        public List<OverbiddingDTO>? Overbiddings { get; set; }

       

        public int? View {get; set; }

        public DateTime? StartingDate { get; set; }

        public DateTime? ExpirationDate { get; set; }

    }
}