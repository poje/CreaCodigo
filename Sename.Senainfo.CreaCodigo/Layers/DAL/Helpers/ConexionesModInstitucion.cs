using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers
{
    public class ConexionesModInstitucion
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["Conexiones"].ToString());
        private SqlConnection _sqlConnection;
        private SqlTransaction _sqlTransaction;
        private SqlTransaction _sqlTransactionAux;
        private const int Timeout = 180; //segs
        protected IDbConnection MConexion;
        protected bool EnTransaccion;

        protected IDbTransaction MTransaccion;

        //protected abstract IDbConnection CrearConexion(string cadena);
        //protected abstract IDbCommand ComandoSql(string comandoSql);
        static readonly System.Collections.Hashtable ColComandos = new System.Collections.Hashtable();

        #region Propiedades

        private string _servidor;

        public string Servidor
        {
            get { return _servidor; }
            set { _servidor = value; }
        }

        private string _base;

        public string Base
        {
            get { return _base; }
            set { _base = value; }
        }

        private string _usuario;

        public string Usuario
        {
            get { return _usuario; }
            set { _usuario = value; }
        }

        private string _passw;

        public string Passw
        {
            get { return _passw; }
            set { _passw = value; }
        }

        #endregion

        public List<SqlParameter> ListParametros = new List<SqlParameter>();

        private void CargarParametros(IDbCommand com, Object[] args)
        {
            for (int i = 1; i < com.Parameters.Count; i++)
            {
                var p = (SqlParameter) com.Parameters[i];
                p.Value = i <= args.Length ? args[i - 1] : null;
            }
        }

        private IDbConnection CrearConexion(string cadenaConexion)
        {
            return new SqlConnection(cadenaConexion);
        }



        //Seccion de Transaccion
        //IniciarTransaccion: iniciar la trans
        //TerminarTransaccion: termina la trans haciendo commit

        // Crea u obtiene un objeto para conectarse a la base de datos.  
        protected IDbConnection Conexion
        {
            get
            {
                if (MConexion == null)
                    MConexion = conn; //CrearConexion(conn.ConnectionString);
                else
                    MConexion = conn;

                return MConexion;
            }
        }

        private IDbCommand Comando(string procedimientoAlmacenado)
        {
            SqlCommand com;
            if (ColComandos.Contains(procedimientoAlmacenado))
            {
                com = (SqlCommand) ColComandos[procedimientoAlmacenado];
                com.CommandTimeout = Timeout;
            }
            else
            {

                var con2 = new SqlConnection(Conexion.ConnectionString);
                con2.Open();
                com = new SqlCommand(procedimientoAlmacenado, con2)
                {
                    CommandType = CommandType.StoredProcedure,
                    CommandTimeout = Timeout
                };

                SqlCommandBuilder.DeriveParameters(com);
                con2.Close();
                con2.Dispose();
                ColComandos.Add(procedimientoAlmacenado, com);
            }
            com.Connection = (SqlConnection) Conexion;
            com.Transaction = (SqlTransaction) MTransaccion;
            return com;
        }




        private IDbCommand ComandoSql(string _comandoSql)
        {
            var com = new SqlCommand(_comandoSql, (SqlConnection) Conexion, (SqlTransaction) MTransaccion);
            return com;
        }

        public void IniciarTransaccion()
        {
            try
            {
                MTransaccion = Conexion.BeginTransaction();
                EnTransaccion = true;
            }
            finally
            {
                EnTransaccion = false;
            }
        }

        //Confirma la transacción activa. 
        public void TerminarTransaccion()
        {
            try
            {
                MTransaccion.Commit();
            }
            finally
            {
                MTransaccion = null;
                EnTransaccion = false;
            }
        }

        //Cancela la transacción activa.
        public void AbortarTransaccion()
        {
            try
            {
                MTransaccion.Rollback();
            }
            finally
            {
                MTransaccion = null;
                EnTransaccion = false;
            }
        }

        //Si no esta abierta la conexion se debe abrir
        public bool Autenticar()
        {
            if (Conexion.State != ConnectionState.Open)
                Conexion.Open();
            return true;
        }

        // cerrar conexion
        public void CerrarConexion()
        {
            if (Conexion.State != ConnectionState.Closed)
                MConexion.Close();
        }



        // Obtiene un Valor Escalar a partir de un Procedimiento Almacenado. 
        public object TraerValorOutputSql(string comadoSql)
        {
            // asignar el string sql al command
            var com = ComandoSql(comadoSql);
            // ejecutar el command
            com.ExecuteNonQuery();
            // declarar variable de retorno
            Object resp = null;

            // recorrer los parametros del Query (uso tipico envio de varias sentencias sql en el mismo command)
            foreach (IDbDataParameter par in com.Parameters)
                // si tiene parametros de tipo IO/Output retornar ese valor
                if (par.Direction == ParameterDirection.InputOutput || par.Direction == ParameterDirection.Output)
                    resp = par.Value;
            return resp;
        }

        // Obtiene un Valor de una funcion Escalar a partir de un Procedimiento Almacenado, con Params de Entrada
        public object TraerValorEscalar(string procedimientoAlmacenado, params object[] args)
        {
            var com = Comando(procedimientoAlmacenado);
            CargarParametros(com, args);
            int i = Convert.ToInt32(com.ExecuteScalar());
            //MConexion.Close();
            return i;
        }

        public double TraerValorEscalar_Double(string procedimientoAlmacenado, params object[] args)
        {
            var com = Comando(procedimientoAlmacenado);
            CargarParametros(com, args);
            double i = Convert.ToDouble(com.ExecuteScalar());
            //MConexion.Close();
            return i;

        }

        // Ejecuta un query sql
        public int EjecutarSql(string comandoSql)
        {
            return ComandoSql(comandoSql).ExecuteNonQuery();
        }

        // Ejecuta un Procedimiento Almacenado en la base. 
        public int EjecutarSP(string procedimientoAlmacenado)
        {
            return Comando(procedimientoAlmacenado).ExecuteNonQuery();
        }

        //Ejecuta un Procedimiento Almacenado en la base, utilizando los parámetros. 
        public int EjecutarSP(string procedimientoAlmacenado, params Object[] args)
        {
            var com = Comando(procedimientoAlmacenado);
            CargarParametros(com, args);
            var resp = com.ExecuteNonQuery();
            for (var i = 0; i < com.Parameters.Count; i++)
            {
                var par = (IDbDataParameter) com.Parameters[i];
                if (par.Direction == ParameterDirection.InputOutput || par.Direction == ParameterDirection.Output)
                    args.SetValue(par.Value, i - 1);
            }
            return resp;
        }

        //Obtiene un DataSet a partir de un Procedimiento Almacenado y sus parámetros. 
        public DataTable TraerDataTable(string procedimientoAlmacenado, params Object[] args)
        {
            DataTable DataTable = TraerDataSet(procedimientoAlmacenado, args).Tables[0].Copy();
            //MConexion.Close();
            return DataTable;
        }

        //Obtiene un DataSet a partir de un Procedimiento Almacenado y sus parámetros. 
        public DataSet TraerDataSet(string procedimientoAlmacenado, params Object[] args)
        {
            var mDataSet = new DataSet();
            try
            {

                CrearDataAdapter(procedimientoAlmacenado, args).Fill(mDataSet);

            }
            catch (Exception ex)
            {
            }
            return mDataSet;
        }

        // Obtiene un DataReader a partir de un Procedimiento Almacenado y sus parámetros. 
        public IDataReader TraerDataReader(string procedimientoAlmacenado, params object[] args)
        {
            var com = Comando(procedimientoAlmacenado);
            CargarParametros(com, args);
            return com.ExecuteReader();
        }

        //Finalmente, es el turno de definir CrearDataAdapter, el cual aprovecha el método Comando para crear el comando necesario.
        protected IDataAdapter CrearDataAdapter(string procedimientoAlmacenado, params Object[] args)
        {
            var da = new SqlDataAdapter((SqlCommand) Comando(procedimientoAlmacenado));
            if (args.Length != 0)
                CargarParametros(da.SelectCommand, args);
            return da;
        } // end CrearDataAdapter

        // Obtiene un Valor a partir de un Procedimiento Almacenado, y sus parámetros. 
        public object TraerValorOutput(string procedimientoAlmacenado, params Object[] args)
        {
            // asignar el string sql al command
            var com = Comando(procedimientoAlmacenado);
            // cargar los parametros del SP
            CargarParametros(com, args);
            // ejecutar el command
            com.ExecuteNonQuery();
            // declarar variable de retorno
            Object resp = null;

            // recorrer los parametros del SP
            foreach (IDbDataParameter par in com.Parameters)
                // si tiene parametros de tipo IO/Output retornar ese valor
                if (par.Direction == ParameterDirection.InputOutput || par.Direction == ParameterDirection.Output)
                    resp = par.Value;
            return resp;
        }

        /// <summary>
        /// //////////////////////////////////////////////////////
        /// </summary>


        //public DbParameterCollection 


        public ConexionesModInstitucion()
        {
            //
            // TODO: Agregar aquí la lógica del constructor
            //



            SqlConnectionStringBuilder csb = new SqlConnectionStringBuilder(conn.ConnectionString);

            this.Servidor = csb.DataSource;
            this.Base = csb.InitialCatalog;
            this.Usuario = csb.UserID;
            this.Passw = csb.Password;

        }


        public void ejecutar(string _sql, List<DbParameter> listDbParameter)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = (_sql);
            cmd.CommandType = CommandType.Text;
            cmd.Connection = conn;

            if (listDbParameter != null)
            {
                foreach (DbParameter dbParameter in listDbParameter)
                    cmd.Parameters.Add(dbParameter);
            }

            Conectar();
            cmd.ExecuteReader();
        }

        public void ejecutar(string _sql, List<DbParameter> listDbParameter, out DbDataReader dataReader)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = (_sql);
            cmd.CommandType = CommandType.Text;
            cmd.Connection = conn;

            if (listDbParameter != null)
            {
                foreach (DbParameter dbParameter in listDbParameter)
                    cmd.Parameters.Add(dbParameter);
            }

            Conectar();
            dataReader = cmd.ExecuteReader();
        }

        public void ejecutar(string _sql)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = (_sql);
            cmd.CommandType = CommandType.Text;
            cmd.Connection = conn;
            Conectar();
            cmd.ExecuteReader();
        }



        public void ejecutar(string _sql, out DbDataReader dataReader)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = (_sql);
            cmd.CommandType = CommandType.Text;
            cmd.Connection = conn;
            cmd.CommandTimeout = 0;
            Conectar();
            dataReader = cmd.ExecuteReader();
        }

        public int ejecutarProcedimiento(string nombre)
        {
            SqlCommand cmd = parametrosProcedimiento(nombre, (DbParameter[]) null);
            cmd.ExecuteNonQuery();
            return (int) cmd.Parameters["ReturnValue"].Value;
        }

        public int ejecutarProcedimiento(string nombre, DbParameter[] parametros)
        {

            SqlCommand cmd = parametrosProcedimiento(nombre, parametros);
            //si hay param de salida
            string salida = string.Empty;
            if (parametros != null)
            {
                foreach (SqlParameter dbParameter in parametros)
                    if (dbParameter.Direction == ParameterDirection.Output)
                        salida = dbParameter.ParameterName;
            }

            if (cmd.Connection == null)
                cmd.Connection = this.conn;
            cmd.ExecuteNonQuery();

            if (salida == String.Empty)
                return cmd.ExecuteNonQuery();
            else
                return Convert.ToInt32(cmd.Parameters[salida].Value);
        }

        public void ejecutarProcedimiento(string nombre, out DbDataReader dataReader)
        {
            SqlCommand cmd = parametrosProcedimiento(nombre, (DbParameter[]) null);
            dataReader = cmd.ExecuteReader();
        }

        public void ejecutarProcedimiento(string nombre, DbParameter[] parametros, out DbDataReader dataReader)
        {
            object[] argsx;
            argsx = new object[parametros.Length];
            int indice = 0;
            foreach (SqlParameter item in parametros)
            {
                argsx[indice] = item.Value;
                indice += 1;
            }

            this.Autenticar();
            dataReader = (DbDataReader) TraerDataReader(nombre, argsx);
        }

        protected SqlCommand parametrosProcedimiento(string nombre, DbParameter[] parametros)
        {
            Conectar();
            SqlCommand oleDbCommand = new SqlCommand(nombre);
            oleDbCommand.CommandType = CommandType.StoredProcedure;
            if (parametros != null)
            {
                foreach (SqlParameter dbParameter in parametros)
                    oleDbCommand.Parameters.Add(dbParameter);
            }
            return oleDbCommand;
        }

        public DbParameter parametros(string nombre, SqlDbType tipo, int tamano, object valor)
        {
            //DbParameter dbp = new DbParameter(nombre, (DbType)tipo, tamano);
            //DbParameter dbp;
            SqlParameter dbp = new SqlParameter();

            dbp.ParameterName = nombre;
            dbp.SqlDbType = tipo;
            dbp.Direction = ParameterDirection.Input;
            if (valor != null)
                dbp.Value = valor;
            return (DbParameter) dbp;
        }

        public static DbParameter CrearParametro(string nombre, SqlDbType tipo, int tamano, object valor)
        {
            //DbParameter dbp = new DbParameter(nombre, (DbType)tipo, tamano);
            //DbParameter dbp;
            SqlParameter dbp = new SqlParameter();

            dbp.ParameterName = nombre;
            dbp.SqlDbType = tipo;
            dbp.Direction = ParameterDirection.Input;
            if (valor != null)
                dbp.Value = valor;
            return (DbParameter) dbp;
        }

        /// <summary>
        /// Crea un parámetro con nombre y valor para se usado en una consulta o procedimiento almacenado.
        /// </summary>
        /// <param name="nombre">Nombre del parámetro</param>
        /// <param name="valor">Valor del parámetro</param>
        /// <returns></returns>
        public DbParameter parametros(string nombre, object valor)
        {
            return (DbParameter) new SqlParameter(nombre, valor);
        }

        public DbParameter parametrosSalida(string nombre, SqlDbType tipo, int tamano)
        {
            SqlParameter dbp = new SqlParameter();

            dbp.ParameterName = nombre;
            dbp.DbType = (DbType) tipo;
            dbp.Direction = ParameterDirection.Output;
            return (DbParameter) dbp;
        }

        private void Conectar()
        {
            //** original **
            conn.Close();
            conn.Open();
            //** original **

            //if (conn.State != ConnectionState.Open)
            //{
            //    conn.Open();
            //}
        }

        public void Desconectar()
        {
            //** original **
            conn.Close();
            //** original **

            //if (conn.State != ConnectionState.Closed)
            //{
            //    conn.Close();
            //}
        }


        public ConexionesModInstitucion(int bd, SqlConnection sqlConnection, SqlTransaction sqlTransaction)
        {
            _sqlConnection = sqlConnection;
            _sqlTransaction = sqlTransaction;
            if (bd == 1)
                conn = new SqlConnection(ConfigurationManager.ConnectionStrings["Conexiones"].ToString());
            else if (bd == 2)
                conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConexionesProduccion"].ToString());
        }

        public SqlTransaction IniciarTransaction()
        {
            return _sqlTransaction = _sqlConnection.BeginTransaction();
        }

        public void AbrirSqlConnection()
        {
            _sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["Conexiones"].ToString());
            _sqlConnection.Open();
        }

        public void CommitTransaction()
        {

            _sqlTransaction.Commit();

            _sqlConnection.Close();
        }

        public void RollbackTransaction()
        {
            _sqlTransaction.Rollback();
            _sqlConnection.Close();
        }

        /// <summary>
        /// Ejecuta el procedimiento almacenado indicado y retorna un DataTable con el resultado de la consulta
        /// </summary>
        /// <param name="procedimiento">Procedimiento a ejecutar</param>
        /// <returns>DataTable con resultado del procedimiento</returns>
        public DataTable EjecutaSPToDataTable(string procedimiento)
        {
            DataTable dt = new DataTable();
            SqlCommand cmd = new SqlCommand(procedimiento, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 10000000;

            SqlDataAdapter sqlda = new SqlDataAdapter(cmd);

            
            cmd.Connection.Open();
            sqlda.Fill(dt);
            cmd.Connection.Close();

            return dt;
        }

        /// <summary>
        /// Ejecuta el procedimiento almacenado indicado, utilizando los parametros de la lista y retorna un DataTable con el resultado de la consulta
        /// </summary>
        /// <param name="procedimiento">Procedimiento a ejecutar</param>
        /// <param name="parametros">Lista de parametros que requiere el procedimiento para ser ejecutado</param>
        /// <returns>DataTable con resultado del procedimiento</returns>
        public DataTable EjecutaSPToDataTable(string procedimiento, List<SqlParameter> parametros)
        {
            DataTable dt = new DataTable();

            SqlCommand cmd = new SqlCommand(procedimiento, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 10000000;

            foreach (SqlParameter parametro in parametros)
            {
                cmd.Parameters.Add(parametro);
            }

            SqlDataAdapter sqlda = new SqlDataAdapter(cmd);

            cmd.Connection.Open();

            sqlda.Fill(dt);

            cmd.Connection.Close();


            return dt;
        }



        public DataTable EjecutaSpToDataTableTransaction(SqlTransaction sqlTransaction, string procedimiento)
        {
            DataTable dt = new DataTable();

            SqlCommand cmd = new SqlCommand(procedimiento, sqlTransaction.Connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Transaction = sqlTransaction;
            cmd.CommandTimeout = 10000000;

            SqlDataAdapter sqlda = new SqlDataAdapter(cmd);

            sqlda.Fill(dt);

            return dt;
        }


        public DataSet EjecutaCommandsToDataSetTransaction(List<SqlCommand> commands)
        {
            var ds = new DataSet("ResolucionProyecto");

            try
            {
                AbrirSqlConnection();

                _sqlTransaction = IniciarTransaction();

                foreach (var sqlCommand in commands)
                {
                    sqlCommand.Transaction = _sqlTransaction;
                    sqlCommand.Connection = _sqlTransaction.Connection;
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.CommandTimeout = 1000000;

                    SqlDataAdapter sqlda = new SqlDataAdapter(sqlCommand);

                    var dt = new DataTable();
                    sqlda.Fill(dt);

                    ds.Tables.Add(dt);

                    sqlda.Dispose();
                }

                CommitTransaction();
            }
            catch (Exception e)
            {
                RollbackTransaction();
            }

            return ds;
        }

        public DataTable EjecutaSpToDataTableCmdReady(SqlCommand cmd, bool initTransaction, bool closeTransaction)
        {
            DataTable dt = new DataTable();

            try
            {
                if (!closeTransaction)
                    AbrirSqlConnection();

                cmd.Connection = _sqlConnection;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 10000000;

                if (initTransaction)
                {
                    _sqlTransaction = IniciarTransaction();

                    cmd.Transaction = _sqlTransaction;
                }else
                {
                    cmd.Transaction = _sqlTransaction;
                }

                SqlDataAdapter sqlda = new SqlDataAdapter(cmd);

                sqlda.Fill(dt);

                if (closeTransaction)
                    CommitTransaction();
                else
                    _sqlTransactionAux = _sqlTransaction;

                return dt;
            }
            catch (Exception e)
            {
                RollbackTransaction();
            }

            return dt;
        }

        public DataTable EjecutaspToDataTableTransaction(string procedimiento,
            List<SqlParameter> parametros, bool iniciarTransaction, bool cerrarTransaction)
        {
            DataTable dt = new DataTable();
            try
            {

                AbrirSqlConnection();

                //if (_sqlTransaction.Connection.State == ConnectionState.Closed)

                if (iniciarTransaction)
                    _sqlTransaction = IniciarTransaction();


                SqlCommand cmd = new SqlCommand(procedimiento, _sqlTransaction.Connection, _sqlTransaction);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 10000000;

                foreach (var parametro in parametros)
                {
                    cmd.Parameters.Add(parametro);
                }

                SqlDataAdapter sqlda = new SqlDataAdapter(cmd);


                sqlda.Fill(dt);

                if (cerrarTransaction)
                    CommitTransaction();
                else
                    _sqlTransactionAux = _sqlTransaction;

                return dt;
            }
            catch (Exception ex)
            {
                RollbackTransaction();
            }

            return dt;

        }

        /// <summary>
        /// Ejecuta el procedimiento almacenado indicado y retorna la cantidad de filas afectadas por éste
        /// </summary>
        /// <param name="procedimiento">Procedimiento a ejecutar</param>
        /// <returns>Número de filas afectadas</returns>
        public int EjecutaSP(string procedimiento)
        {
            int rowsAffected = 0;

            SqlCommand cmd = new SqlCommand(procedimiento, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 10000000;

            cmd.Connection.Open();

            rowsAffected = cmd.ExecuteNonQuery();

            cmd.Connection.Close();

            return rowsAffected;
        }

        /// <summary>
        /// Ejecuta el procedimiento almacenado indicado, utilizando los parametros de la lista y retorna la cantidad de filas afectadas por éste
        /// </summary>
        /// <param name="procedimiento">Procedimiento a Ejecutar</param>
        /// <param name="parametros">Lista de parametros que requiere el procedimiento para ser ejecutado</param>
        /// <returns>Número de filas afectadas</returns>
        public void EjecutaSP(string procedimiento, List<SqlParameter> parametros)
        {

            SqlCommand cmd = new SqlCommand(procedimiento, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 10000000;

            foreach (SqlParameter parametro in parametros)
            {
                cmd.Parameters.Add(parametro);
            }

            cmd.Connection.Open();

            //rowsAffected = cmd.ExecuteNonQuery();
            cmd.ExecuteNonQuery();

            cmd.Connection.Close();
        }

        public int EjecutaSpScalar(string procedimiento, List<SqlParameter> parametros)
        {
            int rowsAffected = 0;

            SqlCommand cmd = new SqlCommand(procedimiento, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 1000000;

            foreach (SqlParameter parametro in parametros)
            {
                cmd.Parameters.Add(parametro);
            }

            cmd.Connection.Open();

            rowsAffected = Convert.ToInt32(cmd.ExecuteScalar());

            cmd.Connection.Close();

            return rowsAffected;
        }

        public int EjecutaSpScalarTransaction(SqlTransaction sqlTransaction, string procedimiento,
            List<SqlParameter> parametros)
        {
            SqlCommand cmd = new SqlCommand(procedimiento, sqlTransaction.Connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 1000000;

            foreach (SqlParameter parametro in parametros)
            {
                cmd.Parameters.Add(parametro);
            }

            return Convert.ToInt32(cmd.ExecuteScalar());
        }

        public int EjecutaSpScalar(string procedimiento)
        {
            int result = 0;

            SqlCommand cmd = new SqlCommand(procedimiento, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 1000000;

            cmd.Connection.Open();

            result = Convert.ToInt32(cmd.ExecuteScalar());

            cmd.Connection.Close();

            return result;
        }

        public int EjecutaSpScalarTransaction(SqlTransaction sqlTransaction, string procedimiento)
        {
            SqlCommand cmd = new SqlCommand(procedimiento, sqlTransaction.Connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 10000000;

            return Convert.ToInt32(cmd.ExecuteScalar());
        }



        /// <summary>
        /// Metodo que agrega parametros a una lista de parametros, ésta cual retorna la lista actualizada con el nuevo parametro
        /// </summary>
        /// <param name="parametros">Lista de parametros a actualizar</param>
        /// <param name="nombreParametro">Nombre del nuevo parametro</param>
        /// <param name="valueParametro">Valor del nuevo parametro</param>
        /// <param name="tipoParametro">Tipo de dato(Sql) del nuevo parametro</param>
        /// <returns>Listado de parametros actualizado</returns>
        public List<SqlParameter> agregarParametroAListSqlParameter(List<SqlParameter> parametros,
            string nombreParametro, object valueParametro, SqlDbType tipoParametro)
        {
            SqlParameter p = new SqlParameter()
            {
                ParameterName = nombreParametro,
                Value = valueParametro,
                SqlDbType = tipoParametro
            };

            parametros.Add(p);
            return parametros;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="nombreProcedimiento"></param>
        /// <returns></returns>
        public DataSet EjecutaProcedimientoToDataset(string nombreProcedimiento)
        {
            DataSet ds = new DataSet();


            SqlCommand cmd = new SqlCommand(nombreProcedimiento, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 10000000;

            SqlDataAdapter sqlda = new SqlDataAdapter(cmd);


            cmd.Connection.Open();

            sqlda.Fill(ds);

            cmd.Connection.Close();


            return ds;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="nombreProcedimiento"></param>
        /// <param name="parametros"></param>
        /// <returns></returns>
        public DataSet EjecutaProcedimientoToDataset(string nombreProcedimiento, List<SqlParameter> parametros)
        {
            DataSet ds = new DataSet();

            SqlCommand cmd = new SqlCommand(nombreProcedimiento, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 10000000;

            foreach (SqlParameter parametro in parametros)
            {
                cmd.Parameters.Add(parametro);
            }

            SqlDataAdapter sqlda = new SqlDataAdapter(cmd);

            cmd.Connection.Open();

            sqlda.Fill(ds);

            cmd.Connection.Close();

            return ds;

        }
    }
}
