using ECommerceApi.Auth;
using ECommerceApi.Data;
using ECommerceApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
    policy.WithOrigins("http://localhost:5173", "https://localhost:5173").AllowAnyHeader().AllowAnyMethod()
));



builder.Services.AddIdentity<AppUser, AppRole>(options =>
{
    options.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<ECommerceContext>()
    .AddDefaultTokenProviders(); // JWT kullanacaðýmýz için bu yapýyý ekledik

var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["secretKey"];

builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; // þema olarak jwt barer defult authendticaton shema seçtik
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme; // authentication için default þemalar
}).AddJwtBearer(options =>
options.TokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuer = true, // bu key kim ürettiyse doðrulamak istediðimi söylüyorum
    ValidateAudience = true,// geçerli bir alýcý mý doðrula
    ValidateLifetime = true, // geçerlilik süresi doðrula
    ValidateIssuerSigningKey = true, // anahtar için sign key ifadesini doðrular
    ValidIssuer = jwtSettings["validIssuer"],
    ValidAudience = jwtSettings["validAudience"],
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
}
);


// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
builder.Services.AddScoped<AuthenticationLogin>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ECommerceContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("connectionString")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
