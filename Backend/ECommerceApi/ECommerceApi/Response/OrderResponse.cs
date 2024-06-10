using ECommerceApi.Models;

namespace ECommerceApi.Response
{
    public class OrderResponse
    {
        public Guid OrderId { get; set; }
        public DateTime OrderDateTime { get; set; }
        public string? OrderAddress { get; set; }
        public string AddressHeaders { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public Guid BasketId { get; set; }
        public ICollection<OrderProduct> OrderProducts { get; set; }
        public double BasketItemPrice { get; set; }
    }
}
