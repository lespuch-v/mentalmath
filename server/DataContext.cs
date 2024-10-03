using Microsoft.EntityFrameworkCore;
using server.Models;
using System.Collections.Generic;

namespace server
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
