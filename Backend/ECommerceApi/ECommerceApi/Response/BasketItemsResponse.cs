namespace ECommerceApi.Response
{
    public class BasketItemsResponse
    {
        public Guid BasketItemId { get; set; }
        public Guid ProductId { get; set; }
        public int ProductUnit { get; set; }
        public Guid BasketId { get; set; }
        public double BasketItemPrice { get; set; }
        public decimal BasketPrice { get; set; }
        public int BasketProductQuantity { get; set; }
        public string? ProductName { get; set; }
        public float ProductPrice { get; set; }
        public string? ProductDescription { get; set; }
        public string? ProductImage1 { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }

    }
}
