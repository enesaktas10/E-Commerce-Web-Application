using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerceApi.Models
{
    public class BasketItem
    {
        public Guid BasketItemId { get; set; }
        public double BasketItemPrice { get; set; }
        public Guid ProductId { get; set; }
        public int  ProductUnit { get; set; }
        public Guid BasketId { get; set; }
        public Basket? Basket { get; set; }
        public Product Product { get; set; }
    }
}
