using System.ComponentModel.DataAnnotations;

namespace ECommerceApi.Dto
{
    public class UserForAuthenticationDto
    {
        [Required(ErrorMessage = "Username is required.")]
        public string? UserName { get; init; } // veriyi taşıcak ilgili veride herhangi bir değişikliğe neden olmicak veri yapısı

        [Required(ErrorMessage = "Password is required.")]
        public string? Password { get; init; }
    }
}
