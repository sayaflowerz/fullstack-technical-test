using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("CustomerOrders")] // Mapea esta clase a la tabla CustomerOrders en la base de datos OrderDB
    public class Order
    {
        public int OrderId { get; set; }             // primary key
        public string CustomerName { get; set; }     
        public string CustomerId { get; set; }       
        public string Product { get; set; }        
        public int Quantity { get; set; }            
        public DateTime DeliveryDate { get; set; }  
        public string DeliveryAddress { get; set; }  
        public string PaymentMethod { get; set; }    
        public long ContactPhone { get; set; }      
    }
}