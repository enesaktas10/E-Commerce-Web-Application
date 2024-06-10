using ECommerceApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace ECommerceApi.Data
{
    public class ECommerceContext:IdentityDbContext<AppUser,AppRole,int>
    {
        public ECommerceContext(DbContextOptions options) : base(options)
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            base.OnConfiguring(optionsBuilder);

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<AppUser>().HasKey(k => k.Id);
            builder.Entity<AppUser>().HasOne(b => b.Basket).WithOne(b => b.User)
                .HasForeignKey<AppUser>(b => b.BasketId);

            builder.Entity<Basket>()
                .HasKey(b => b.BasketId);

            builder.Entity<Basket>()
                .HasOne(b => b.User)
                .WithOne(a => a.Basket);

            builder.Entity<OrderProduct>()
               .HasKey(op => new { op.OrderId, op.ProductId });

            builder.Entity<OrderProduct>()
                .HasOne(op => op.Order)
                .WithMany(o => o.OrderProducts)
                .HasForeignKey(op => op.OrderId);

            builder.Entity<OrderProduct>()
                .HasOne(op => op.Product)
                .WithMany(p => p.OrderProducts)
                .HasForeignKey(op => op.ProductId);


            base.OnModelCreating(builder);
            // bu tarz ıdentityuser gibi contextlerle çalıştığımızda base.OnModelCreating(builder); yapısı gerekli

        }

        public DbSet<Brand> Brands { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<BasketItem> BasketItems { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }

    }
}
