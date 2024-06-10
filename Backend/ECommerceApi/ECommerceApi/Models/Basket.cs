using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ECommerceApi.Models
{
    public class Basket
    {
        [Key]
        public Guid BasketId { get; set; }

        public decimal BasketPrice { get; set; }
        public int BasketProductQuantity { get; set; }


        //F.K
        //public List<Product>? Products { get; set; }

        public List<BasketItem>? BasketItems { get; set; }

        //F.K
        public AppUser? User { get; set; }


        //P.K
        public List<Order>? Orders { get; set; }
    }
}
