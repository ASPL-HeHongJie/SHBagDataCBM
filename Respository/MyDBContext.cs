using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Respository
{
    public class MyDBContext : DbContext
    {
        public MyDBContext(string connectionString) : base(CreateOptions(connectionString))
        {
        }
        private static DbContextOptions CreateOptions(string connectionString)
        {
            DbContextOptionsBuilder builder =new DbContextOptionsBuilder().UseSqlServer(connectionString);
            return builder.Options;
        }
        public DbSet<Area> Areas { get; set; }

        public DbSet<HisCheckDataAlarm> hisCheckDataAlarms { get; set; }

        public DbSet<HistoricalAlarm> HistoricalAlarms { get; set; }
    }
}
