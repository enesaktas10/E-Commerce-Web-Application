using ECommerceApi.Auth;
using ECommerceApi.Data;
using ECommerceApi.Dto;
using ECommerceApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AuthenticationLogin _authenticationLogin;
        private readonly ECommerceContext _context;


        public RegisterController(UserManager<AppUser> userManager, AuthenticationLogin authenticationLogin, ECommerceContext context)
        {
            _userManager = userManager;
            _authenticationLogin = authenticationLogin;
            _context = context;
        }

       

        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] AppUserRegisterDto appUserRegisterDto)
        {
            if (ModelState.IsValid)
            {
                var newUser = new AppUser
                {
                    UserName = appUserRegisterDto.Username,
                    Name = appUserRegisterDto.Name,
                    Surname = appUserRegisterDto.Surname,
                    Email = appUserRegisterDto.Email,
                    Basket = new Basket()
                    {
                        
                    },
                };


                var result = await _userManager.CreateAsync(newUser, appUserRegisterDto.Password);


                if (result.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }

                    return BadRequest(ModelState);
                }

            }


            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromBody] UserForAuthenticationDto user)
        {
            if (!await _authenticationLogin.ValidateUser(user))
                return Unauthorized();

            var tokenDto = await _authenticationLogin.CreateToken(populateExp: true);

            return Ok(tokenDto);

        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] TokenDto tokenDto)
        {
            if (tokenDto is null)
            {
                throw new Exception();
            }

            var tokenDtoReturn = await _authenticationLogin.RefreshToken(tokenDto);

            return Ok(tokenDtoReturn);
        }

    }
}
