using ECommerceApi.Data;
using ECommerceApi.Models;
using ECommerceApi.Request;
using ECommerceApi.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ECommerceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly ECommerceContext _context;

        public BasketController(ECommerceContext context)
        {
            _context = context;
        }


        //Sepete ürün ekleme servisi
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> AddProduct([FromRoute(Name = "id")] Guid id)
        {
            var userName = User.Claims.FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var findUser = await _context.Users.Where(x => x.UserName == userName).SingleOrDefaultAsync();

            if (findUser is null) return NotFound();


            var userBasketId = findUser.BasketId;
            
            var findBasket = await _context.Baskets.FindAsync(userBasketId);

            //if (findBasket is null) return NotFound("Sepet Bulunmaadı!!!");

            var findProduct = await _context.Products.FindAsync(id);

            if (findProduct is null) return NotFound();


            var zz = await _context.BasketItems.Where(x => x.BasketId == userBasketId && x.ProductId == id).FirstOrDefaultAsync();
            
            if (zz is null)
            {
                var newBasketItem = new BasketItem()
                {
                    BasketId = userBasketId,
                    BasketItemId = Guid.NewGuid(),
                    ProductId = findProduct.ProductId,
                    ProductUnit = 1,
                    BasketItemPrice = findProduct.ProductPrice
                };
                await _context.BasketItems.AddAsync(newBasketItem);
                await _context.SaveChangesAsync();
            } else
            {
                zz.ProductUnit = zz.ProductUnit + 1;
                zz.BasketItemPrice = zz.BasketItemPrice + findProduct.ProductPrice;
                await _context.SaveChangesAsync();
            }

            

            findBasket.BasketProductQuantity = findBasket.BasketProductQuantity + 1;
            findBasket.BasketPrice = findBasket.BasketPrice + Convert.ToDecimal(findProduct.ProductPrice);
            await _context.SaveChangesAsync();
            return Ok("");
        }


        //Sepetteki basketİtemları getiren servis
        [HttpGet("GetAllItems")]
        public async Task<IActionResult> GetAllItems()
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


            var findBasketItem = await _context.BasketItems.Where(p => p.BasketId == findBasketId).ToListAsync();

            
            var userFOund = await _context.Users.Include(u => u.Basket).ThenInclude(b => b.BasketItems).FirstOrDefaultAsync(p => p.UserName == userName);

            var assa = await _context.BasketItems.Where(b => b.BasketId == findBasketId).Include(u => u.Product).ToListAsync();



            

            if (assa is null || !assa.Any()) return BadRequest();

            var response = assa.Select(item => new BasketItemsResponse
            {
                BasketId = item.BasketId,
                BasketItemId = item.BasketItemId,
                BasketItemPrice = item.BasketItemPrice,
                BasketPrice = item.Basket.BasketPrice,
                BasketProductQuantity = item.Basket.BasketProductQuantity,
                BrandId = item.Product.BrandId,
                CategoryId = item.Product.CategoryId,
                ProductDescription = item.Product.ProductDescription,
                ProductId = item.ProductId,
                ProductImage1 = item.Product.ProductImage1,
                ProductName = item.Product.ProductName,
                ProductPrice = (float)item.Product.ProductPrice,
                ProductUnit = item.ProductUnit
            }).ToList();


            return Ok(response);
        }

        //Baskettan item silme servisi
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteOneProduct([FromRoute(Name = "id")] Guid id)
        {
            var userName = User.Claims.FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var findUser = await _context.Users.Where(x => x.UserName == userName).SingleOrDefaultAsync();

            if (findUser is null) return NotFound();


            var userBasketId = findUser.BasketId;

            var findBasket = await _context.Baskets.FindAsync(userBasketId);

            //if (findBasket is null) return NotFound("Sepet Bulunmaadı!!!");

            var findProduct = await _context.Products.FindAsync(id);

            if (findProduct is null) return NotFound();

            var findBasketItem = await _context.BasketItems.Where(x => x.ProductId == findProduct.ProductId).FirstOrDefaultAsync();

            if (findBasketItem is null) return BadRequest();

            if(findBasketItem.ProductUnit > 1)
            {
                findBasketItem.ProductUnit = findBasketItem.ProductUnit - 1;
                findBasketItem.BasketItemPrice = findBasketItem.BasketItemPrice - findProduct.ProductPrice;
                findBasket.BasketPrice = findBasket.BasketPrice - Convert.ToDecimal(findProduct.ProductPrice);
                findBasket.BasketProductQuantity = findBasket.BasketProductQuantity - 1;
                await _context.SaveChangesAsync();
                return Ok();
            }

            _context.BasketItems.Remove(findBasketItem);
            findBasket.BasketPrice = findBasket.BasketPrice - Convert.ToDecimal(findProduct.ProductPrice);
            findBasket.BasketProductQuantity = findBasket.BasketProductQuantity - 1;
            await _context.SaveChangesAsync();

            return Ok();
        }

        }
    }



