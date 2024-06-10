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
    public class CategoryController : ControllerBase
    {
        private readonly ECommerceContext _context;

        public CategoryController(ECommerceContext context)
        {
            _context = context;
        }

        //Tüm katekorileri getiren servis
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _context.Categories.Select(x=>new CategoryResponse()
            {
                CategoryId = x.CategoryId,
                CategoryName = x.CategoryName
            }).ToListAsync();
            return Ok(categories);
        }


        //Prodcutları kategoriye göre getiren servis
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute(Name = "id")]int id )
        {
            var findProduct = await _context.Products.Where(x => x.CategoryId == id).ToListAsync();

            if (findProduct.Any())
            {
                var response = findProduct.Select(i => new ProductResponse
                {
                    BrandId = i.BrandId,
                    CategoryId = i.CategoryId,
                    ProductDescription = i.ProductDescription,
                    ProductId = i.ProductId,
                    ProductName = i.ProductName,
                    ProductPrice = i.ProductPrice,
                    ProductImage1 = i.ProductImage1
                    
                }).ToList();

                return Ok(response);
            }

            return BadRequest();


        }

        //Kategori ekleme servisi
        [HttpPost]
        public async Task<IActionResult> Add([FromBody]CategoryRequest request)
        {
            var newCategory = new Category()
            {
                
                CategoryName = request.CategoryName
            };

            if (newCategory is null) return BadRequest();

            await _context.Categories.AddAsync(newCategory);
            await _context.SaveChangesAsync();

            var response = new CategoryResponse()
            {
                CategoryId = newCategory.CategoryId,
                CategoryName = newCategory.CategoryName
            };

            return Ok(response);
        }

    }
}
