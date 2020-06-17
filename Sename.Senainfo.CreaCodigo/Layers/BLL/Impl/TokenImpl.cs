using System;
using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class TokenImpl
    {
        private readonly TokenDao _tokenDao;

        public TokenImpl()
        {
            _tokenDao = new TokenDao();
        }

        public List<TokenDto> GetTokenList(DataTable dtTokens)
        {
            var list = new List<TokenDto>();

            foreach (DataRow row in dtTokens.Rows)
            {
                var token = new TokenDto
                {
                    IdToken = Convert.ToInt32(row["IdToken"].ToString()),
                    TokenCadena = row["TokenCadena"].ToString()
                };

                list.Add(token);
            }

            return list;
        }
    }
}