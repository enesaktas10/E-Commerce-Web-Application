namespace ECommerceApi.Request
{
    public class AddProductToBasketRequest
    {
        public Guid BasketId { get; set; }
        public decimal BasketPrice { get; set; }
        public int BasketProductQuantity { get; set; }
    }
}
