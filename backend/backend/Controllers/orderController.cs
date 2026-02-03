using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    //Endpoint /api/orders
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetAll()
        {
            return await _context.CustomerOrders.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetById(int id)
        {
            var order = await _context.CustomerOrders.FindAsync(id);
            if (order == null) return NotFound();
            return order;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> Create(Order order)
        {
            _context.CustomerOrders.Add(order);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = order.OrderId }, order);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Order order)
        {
            if (id != order.OrderId) return BadRequest();

            _context.Entry(order).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var order = await _context.CustomerOrders.FindAsync(id);
            if (order == null) return NotFound();

            _context.CustomerOrders.Remove(order);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
