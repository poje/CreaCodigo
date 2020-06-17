namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class TokenDto
    {
        public int IdToken { get; set; }
        public string TokenCadena { get; set; }

        public TokenDto()
        {

        }

        public TokenDto(int idToken, string tokenCadena)
        {
            IdToken = idToken;
            TokenCadena = tokenCadena;
        }
    }
}