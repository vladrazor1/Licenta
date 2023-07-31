using LicentaApi.Models;

namespace LicentaApi.Models
{
    public class Overbidding
    {
        public long Id { get; set; }

        public long? UserId { get; set; }

        public long? ProductId { get; set; }

        public long? OverbiddingPrice { get; set; }

    }
}