using ECommerceApi.Data;
using ECommerceApi.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilterController : ControllerBase
    {
        private readonly ECommerceContext _context;

        public FilterController(ECommerceContext context)
        {
            _context = context;
        }


        //Kayegoriye ve Markaya Göre Ürünleri getiren servis
        [HttpGet("FilterForCategoryAndBrand")]
        public async Task<IActionResult> FilterForCategoryAndBrand([FromQuery] int categoryId, [FromQuery] int brandId)
        {

            var findProductsForCategory = await _context.Products.Where(p => p.CategoryId == categoryId).ToListAsync();

            var findProductsForBrands = findProductsForCategory.Where(p => p.BrandId == brandId).ToList();

            var response = findProductsForBrands.Select(item => new ProductResponse()
            {
                BrandId = item.BrandId,
                CategoryId = item.CategoryId,
                ProductDescription = item.ProductDescription,
                ProductId = item.ProductId,
                ProductImage1 = item.ProductImage1,
                ProductName = item.ProductName,
                ProductPrice = item.ProductPrice
            }).ToList();

            return Ok(response);
        }


    }
}
