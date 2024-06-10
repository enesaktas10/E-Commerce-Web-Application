namespace ECommerceApi.Response
{
    public class BasketResponse
    {
        public Guid BasketId { get; set; }

        public decimal BasketPrice { get; set; }
        public int BasketProductQuantity { get; set; }
    }
}
