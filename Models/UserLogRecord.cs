using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Table("tUserLogRecord")]
    public class UserLogRecord
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public DateTime DateTime { get; set; }
        public string Description  { get; set; }
    }
}
