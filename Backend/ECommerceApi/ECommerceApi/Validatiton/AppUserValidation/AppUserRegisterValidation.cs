using ECommerceApi.Dto;
using FluentValidation;

namespace ECommerceApi.Validatiton.AppUserValidation
{
    public class AppUserRegisterValidation:AbstractValidator<AppUserRegisterDto>
    {
        public AppUserRegisterValidation()
        {
            RuleFor(x => x.Name).Empty().WithMessage("Ad alani bos gelicemez");
            RuleFor(x => x.Surname).Empty().WithMessage("Soyad alani bos gelicemez");
            RuleFor(x => x.Username).Empty().WithMessage("Kullanici alani bos gelicemez");
            RuleFor(x => x.Email).Empty().WithMessage("Email alani bos gelicemez");
            RuleFor(x => x.Password).Empty().WithMessage("Sifre alani bos gelicemez");
            RuleFor(x => x.ConfirmPassword).Empty().WithMessage("Sifre onaylama alani bos gelicemez");
            RuleFor(x => x.Name).MaximumLength(30).WithMessage("Isim en fazla 30 karakter iceribilir");
            RuleFor(x => x.Name).MinimumLength(3).WithMessage("Isim en fazla 3 karakterden olusabilir");
            RuleFor(x => x.ConfirmPassword).Equal(y => y.Password).WithMessage("Parolalariniz Eslesmiyor");
            RuleFor(x => x.Email).EmailAddress().WithMessage("Lutfen gecerli bir email adresi giriniz");
        }
    }
}
