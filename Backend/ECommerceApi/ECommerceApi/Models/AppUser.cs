using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerceApi.Models
{
    public class AppUser:IdentityUser<int>
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public String? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }


        //P.K
        [ForeignKey("BasketId")]
        public Guid BasketId { get; set; }
        public Basket? Basket { get; set; }

        
    }
}
