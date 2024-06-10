using ECommerceApi.Data;
using ECommerceApi.Models;
using ECommerceApi.Request;
using ECommerceApi.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ECommerceContext _context;

        public OrderController(ECommerceContext context)
        {
            _context = context;
        }

        
        //Siparis olusturma servisi
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderRequest request)
        {
            //Oncelikle Sistemde login olmus kullaniciyi getirmem gerekiyor
            var userName = User.Claims.FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var findUser = await _context.Users.Where(x => x.UserName == userName).SingleOrDefaultAsync();
            if (findUser is null) return NotFound();

            var findId = findUser!.Id;
            var findBasketId = findUser.BasketId;
            var findBasket = await _context.Baskets.FindAsync(findBasketId);


            var basketItems = await _context.BasketItems.Where(x => x.BasketId == findBasketId).ToListAsync();

            var newOrder = new Order()
            {
                OrderId = Guid.NewGuid(),
                OrderDateTime = DateTime.Now,
                OrderAddress = request.OrderAddress,
                AddressHeaders = request.AddressHeaders,
                Name = request.Name,
                Surname =request.Surname,
                PhoneNumber = request.PhoneNumber,
                City = request.City,
                District = request.District,
                BasketId = findBasketId,
                OrderProducts = new List<OrderProduct>(),
            };

            foreach(var item in basketItems)
            {
                var orderProduct = new OrderProduct()
                {
                    OrderProductId = Guid.NewGuid(),
                    OrderId = newOrder.OrderId,
                    ProductId = item.ProductId,
                    Quantity = item.ProductUnit,
                    TotalPrice = item.BasketItemPrice
                };
                newOrder.OrderProducts.Add(orderProduct);
            }
            
            
                await _context.Orders.AddAsync(newOrder);
                await _context.SaveChangesAsync();



            //siparisi aldiktan kullanicin sepetini bosaltiyorum
            var findBasketItems = await _context.BasketItems.Where(b => b.BasketId == findBasketId).ToListAsync();
            _context.BasketItems.RemoveRange(findBasketItems);

            findBasket.BasketProductQuantity = 0;
            findBasket.BasketPrice = 0;

            await _context.SaveChangesAsync();



            var orderResponse = new OrderResponse()
            {
                OrderId = newOrder.OrderId,
                OrderDateTime = newOrder.OrderDateTime,
                OrderAddress = newOrder.OrderAddress,
                Name = newOrder.Name,
                Surname = newOrder.Surname,
                PhoneNumber = newOrder.PhoneNumber,
                City = newOrder.City,
                District = newOrder.District,
                BasketId = findBasketId,
                AddressHeaders = newOrder.AddressHeaders,
                OrderProducts = newOrder.OrderProducts
            };

            return Ok(orderResponse);
        }

        //Siparisleri Listeleme Servisi
        [HttpGet(Name = "GetAllOrders")]
        public async Task<IActionResult> GetAllOrders()
        {
            //Oncelikle Sistemde login olmus kullaniciyi getirmem gerekiyor
            var userName = User.Claims.FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var findUser = await _context.Users.Where(x => x.UserName == userName).SingleOrDefaultAsync();
            if (findUser is null) return NotFound();

            var findId = findUser!.Id;
            var findBasketId = findUser.BasketId;
            var findBasket = await _context.Baskets.FindAsync(findBasketId);



            var getOrders = await _context.Orders
            .Where(x => x.BasketId == findBasketId)// OrderProducts ilişkisini dahil et
            .ToListAsync();

            //var getOrders = await _context.Orders
            //.Where(x => x.BasketId == findBasketId)
            //.Include(o => o.Products) // Eager loading ile Products ilişkisini dahil et
            //.ToListAsync();


            //if (getOrders is null || !getOrders.Any()) return BadRequest();

            //var response = getOrders.Select(item => new OrderProduct()
            //{



            //}).ToList();



            return Ok(getOrders);
        }


        //Sipraişi iptal etme servisi
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteOrder([FromRoute(Name = "id")] Guid id)
        {
            var findOrder = await _context.Orders.FindAsync(id);
            if (findOrder is null) return NotFound("Order is Not Found");

            var findOrderProducts = await _context.OrderProducts.Where(x => x.OrderId == id).ToListAsync();

            if (findOrderProducts.Any())
            {
                _context.OrderProducts.RemoveRange(findOrderProducts);
                await _context.SaveChangesAsync();
            }

            _context.Orders.Remove(findOrder);
            await _context.SaveChangesAsync();

            return Ok();

        }

        //Sipraişin içeriğini gösteren servis(Frontend kısmında incele basıynca tetikleniyor)
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> ReviewOrder([FromRoute(Name = "id")] Guid orderId)
        {
            var userName = User.Claims.FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var findUser = await _context.Users.Where(x => x.UserName == userName).SingleOrDefaultAsync();
            if (findUser is null) return NotFound();

            var findId = findUser!.Id;
            var findBasketId = findUser.BasketId;
            var findBasket = await _context.Baskets.FindAsync(findBasketId);

            var findOrderProducts = await _context.OrderProducts.Where(x => x.OrderId == orderId).ToListAsync();

            

            var response = findOrderProducts.Select(item => new OrderProductResponse()
            {
                product = _context.Products.Find(item.ProductId),
                productMoney = item.TotalPrice,
                productUnit = item.Quantity
            }).ToList();

            return Ok(response);

            //var orderProductIds = findOrderProducts.Select(op => op.ProductId).ToList();

            //var products = await _context.Products
            //.Where(p => orderProductIds.Contains(p.ProductId))
            //.ToListAsync();

            //var order = await _context.Orders
            //.Where(x => x.OrderId == orderId && x.BasketId == findBasketId)
            //.Include(o => o.Products) // Eager loading ile Products ilişkisini dahil et
            //.SingleOrDefaultAsync();

            //var findOrders = await _context.Orders.Where(x => x.OrderId == orderId).ToListAsync();

            //if (findOrders is null || !findOrders.Any()) return BadRequest();



            //if (findOrders is null)
            //{
            //return BadRequest();
            //}



        }



    }
}
