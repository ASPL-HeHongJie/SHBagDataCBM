using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace CBMHistoricalTagDataService
{
    public class SQLServerDBContext : DbContext

    {
        private readonly string _connectionString;

        public SQLServerDBContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        { }
        public DbSet<HistoricalTag> HistoricalTags { get; set; }
    }
}
