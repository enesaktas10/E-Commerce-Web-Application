using ECommerceApi.Models;

namespace ECommerceApi.Response
{
    public class OrderProductResponse
    {
        public Product product { get; set; }
        public int productUnit { get; set; }
        //public int productTotalUnit { get; set; }
        public double productMoney { get; set; }
        //public decimal productTotalMoney { get; set; }
    }
}
