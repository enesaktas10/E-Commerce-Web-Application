using System.ComponentModel.DataAnnotations;

namespace ECommerceApi.Models
{
    public class Product
    {
        [Key]
        public Guid ProductId { get; set; }
        public string? ProductName { get; set; }
        public double ProductPrice { get; set; }
        public string? ProductDescription { get; set; }
        public string? ProductImage1 { get; set; }

        public ICollection<OrderProduct> OrderProducts { get; set; }

        // Foreign Key
        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        // Foreign Key
        public int BrandId { get; set; }
        public Brand? Brand { get; set; }



    }
}
