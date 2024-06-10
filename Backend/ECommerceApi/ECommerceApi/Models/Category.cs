using System.ComponentModel.DataAnnotations;

namespace ECommerceApi.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }


        //P.K 
        public List<Product>? Products { get; set; }
    }
}
