using System;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;

namespace EmployeeDepartmentAPI.DataAccess
{
    public class DbHelper
    {
        private readonly string _connectionString;

        public DbHelper(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public MySqlConnection GetConnection()
        {
            return new MySqlConnection(_connectionString);
        }

        public bool TestConnection()
        {
            try
            {
                using (var connection = GetConnection())
                {
                    connection.Open(); // Attempt to open the connection
                    Console.WriteLine("Connection to MySQL successful!");
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Connection to MySQL failed: {ex.Message}");
                return false;
            }
        }
    }
}
