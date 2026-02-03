import { Component, OnInit, ChangeDetectorRef } from '@angular/core';                                                                                                                                  
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService, Order } from '../../services/order';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {
  orders: Order[] = [];
  searchTerm = '';

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAll().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.orders = data;
        this.cdr.detectChanges();  // Me aseguro de que la vista se actualice, forzando a angular a detectar cambios
      },
      error: (err) => console.error('Error loading orders:', err)
    });
  }

  get filteredOrders(): Order[] {
    if (!this.searchTerm) return this.orders;
    const term = this.searchTerm.toLowerCase();
    return this.orders.filter(o =>
      o.customerName.toLowerCase().includes(term) ||
      o.customerId.toLowerCase().includes(term)
    );
  }

 
  deleteOrder(id: number) {
    Swal.fire({
      title: 'Delete Order?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
     }).then((result: any) => {
      if (result.isConfirmed) {
        this.orderService.delete(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Order has been deleted.', 'success');
            this.loadOrders();
           },
          error: (err) => console.error('Error deleting:', err)
        });
       }
    });
  }
}