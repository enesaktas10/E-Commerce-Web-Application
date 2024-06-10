namespace ECommerceApi.Request
{
    public class OrderRequest
    {
        public string? OrderAddress { get; set; }
        public string AddressHeaders { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }
        public string District { get; set; }
    }
}
