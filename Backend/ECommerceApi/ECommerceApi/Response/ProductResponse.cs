using ECommerceApi.Dto;

namespace ECommerceApi.Response
{
    public class ProductResponse
    {
        public Guid ProductId { get; set; }
        public string? ProductName { get; set; }
        public double ProductPrice { get; set; }
        public string? ProductDescription { get; set; }
        public string? ProductImage1 { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }
    }
}
