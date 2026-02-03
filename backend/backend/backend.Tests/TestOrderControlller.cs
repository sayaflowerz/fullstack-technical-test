using Xunit;
using Microsoft.EntityFrameworkCore;
using backend.Controllers;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.backend.Tests
{
    public class TestOrderControlller
    {
        private ApplicationDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            return new ApplicationDbContext(options);
        }

        [Fact]
        public async Task GetAll_ReturnsAllOrders()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            context.CustomerOrders.Add(new Order
            {
                OrderId = 1,
                CustomerName = "Test",
                CustomerId = "123",
                Product = "Electronics",
                Quantity = 2,
                DeliveryDate = DateTime.Now,
                DeliveryAddress = "Test Address",
                PaymentMethod = "Cash",
                ContactPhone = 123456789
            });
            await context.SaveChangesAsync();

            var controller = new OrdersController(context);

            // Act
            var result = await controller.GetAll();

            // Assert
            Assert.NotNull(result.Value);
            Assert.Single(result.Value);
        }

        [Fact]
        public async Task GetById_ReturnsOrder_WhenExists()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var order = new Order
            {
                OrderId = 1,
                CustomerName = "Juan",
                CustomerId = "456",
                Product = "Books",
                Quantity = 1,
                DeliveryDate = DateTime.Now,
                DeliveryAddress = "Calle 123",
                PaymentMethod = "Card",
                ContactPhone = 987654321
            };
            context.CustomerOrders.Add(order);
            await context.SaveChangesAsync();

            var controller = new OrdersController(context);

            // Act
            var result = await controller.GetById(1);

            // Assert
            Assert.NotNull(result.Value);
            Assert.Equal("Juan", result.Value!.CustomerName);
        }

        [Fact]
        public async Task GetById_ReturnsNotFound_WhenNotExists()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var controller = new OrdersController(context);

            // Act
            var result = await controller.GetById(999);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task Create_AddsNewOrder()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var controller = new OrdersController(context);
            var newOrder = new Order
            {
                CustomerName = "Maria",
                CustomerId = "789",
                Product = "Clothing",
                Quantity = 3,
                DeliveryDate = DateTime.Now.AddDays(5),
                DeliveryAddress = "Av Principal",
                PaymentMethod = "Bank transfer",
                ContactPhone = 555555555
            };

            // Act
            var result = await controller.Create(newOrder);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            Assert.NotNull(createdResult.Value);
            var returnedOrder = Assert.IsType<Order>(createdResult.Value);
            Assert.Equal("Maria", returnedOrder.CustomerName);
        }

        [Fact]
        public async Task Delete_RemovesOrder_WhenExists()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var order = new Order
            {
                OrderId = 1,
                CustomerName = "ToDelete",
                CustomerId = "000",
                Product = "Test",
                Quantity = 1,
                DeliveryDate = DateTime.Now,
                DeliveryAddress = "Delete me",
                PaymentMethod = "Cash",
                ContactPhone = 111111111
            };
            context.CustomerOrders.Add(order);
            await context.SaveChangesAsync();

            var controller = new OrdersController(context);

            // Act
            var result = await controller.Delete(1);

            // Assert
            Assert.IsType<NoContentResult>(result);
            // materializar los elementos para evitar advertencias de nulabilidad/EF lazy issues
            var allOrders = context.CustomerOrders.ToList();
            Assert.Empty(allOrders);
        }

        [Fact]
        public async Task Delete_ReturnsNotFound_WhenNotExists()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var controller = new OrdersController(context);

            // Act
            var result = await controller.Delete(999);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}