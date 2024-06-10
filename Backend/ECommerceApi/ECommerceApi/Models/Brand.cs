using System.ComponentModel.DataAnnotations;

namespace ECommerceApi.Models
{
    public class Brand
    {
        [Key]
        public int BrandId { get; set; }
        public string? BrandName { get; set; }


        //P.K
        public List<Product>? Products { get; set; }
    }
}
