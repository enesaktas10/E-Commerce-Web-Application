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
    public class ProductController : ControllerBase
    {
        private readonly ECommerceContext _context;

        public ProductController(ECommerceContext context)
        {
            _context = context;
        }

        //Tüm productları getiren servis
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var getProductResponse = await _context.Products.Select(p => new ProductResponse()
            {
                ProductDescription = p.ProductDescription,
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                ProductPrice = p.ProductPrice,
                CategoryId = p.CategoryId,
                BrandId = p.BrandId,
                
            }).ToListAsync();

            return Ok(getProductResponse);
        }

        //Id"e göre tek bir productı getiren servis
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute(Name = "id")] Guid id)
        {
            var getProducts = await _context.Products.Select(p => new ProductResponse()
            {
                ProductDescription = p.ProductDescription,
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                ProductPrice = p.ProductPrice,
                BrandId = p.BrandId,
                CategoryId = p.CategoryId,
                ProductImage1 = p.ProductImage1             
            }).ToListAsync();
            
            var product = getProducts.Where(product => product.ProductId == id).ToList();
            

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(product);
        }

        //Product ekleme servisi
        [HttpPost("AddProduct")]
        public async Task<IActionResult> Add([FromBody]AddProductRequest productRequest)
        {
            var newProduct = new Product()
            {
                ProductId = Guid.NewGuid(),
                ProductName = productRequest.ProductName,
                ProductDescription = productRequest.ProductDescription,
                CategoryId = productRequest.CategoryId,
                BrandId = productRequest.BrandId,
                ProductPrice = productRequest.ProductPrice,
                
            };

            if (newProduct is null) return BadRequest();

            await _context.Products.AddAsync(newProduct);
            await _context.SaveChangesAsync();

            var response = new ProductResponse()
            {
                BrandId = newProduct.BrandId,
                CategoryId = newProduct.CategoryId,
                ProductDescription = newProduct.ProductDescription,
                ProductId = newProduct.ProductId,
                ProductName = newProduct.ProductName,
                ProductPrice = newProduct.ProductPrice
            };

            return Ok(response);
        }

        //Product silme servisi
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute(Name = "id")] Guid id)
        {
            var findProduct = await _context.Products.FindAsync(id);

            if (findProduct is null) return BadRequest();

            _context.Products.Remove(findProduct);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
