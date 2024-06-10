namespace ECommerceApi.Request
{
    public class AddProductRequest
    {
        public string? ProductName { get; set; }
        public double ProductPrice { get; set; }
        public string? ProductDescription { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }
    }
}
