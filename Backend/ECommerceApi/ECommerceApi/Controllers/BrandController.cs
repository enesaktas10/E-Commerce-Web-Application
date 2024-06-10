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
    public class BrandController : ControllerBase
    {
        private readonly ECommerceContext _context;

        public BrandController(ECommerceContext context)
        {
            _context = context;
        }

        //Tüm markaları getiren servis
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var brands = await _context.Brands.Select(x=>new BrandResponse()
            {
                BrandId = x.BrandId,
                BrandName = x.BrandName
            }).ToListAsync();

            

           return Ok(brands);
        }

        
        //Marka ekleme servisi
        [HttpPost("AddBrandAsync")]
        public async Task<IActionResult> Add([FromForm]BrandRequest request)
        {
            var newBrand = new Brand()
            {
                BrandName = request.BrandName,
            };

            if (request.BrandName is null)  return BadRequest();
                            
            await _context.AddAsync(newBrand);
            await _context.SaveChangesAsync();

            var response = new BrandResponse()
            {
                BrandId = newBrand.BrandId,
                BrandName = newBrand.BrandName
            };

            return Ok(response);
        }


        
    }
}
