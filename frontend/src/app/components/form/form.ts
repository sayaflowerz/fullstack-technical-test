import { AfterViewInit, Component, OnInit, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';                                                                                              
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { OrderService, Order } from '../../services/order';


@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit, AfterViewInit {
  private map: any;
  private marker: any;
   private L: any;

  isEditMode = false;
  orderId: number | null = null;

  order: Order = {
      orderId: 0,
      customerName: '',
      customerId: '',
      product: '',
      quantity: 1,
      deliveryDate: '',
      deliveryAddress: '',
      paymentMethod: '',
      contactPhone: ''
    };

  products = ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Sports & Outdoors', 'Beauty', 'Toys & Games', 'Health', 'Automotive', 'Office Supplies'];
  paymentMethods = ['Cash', 'Card', 'Bank transfer'];

 constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.orderId = +idParam;
      this.isEditMode = true;
      this.loadOrder();
    }
  }

  loadOrder() {
    if (this.orderId) {
      this.orderService.getById(this.orderId).subscribe({
        next: (data) => {
          this.order = data;
          if (this.order.deliveryDate) {
            this.order.deliveryDate = this.order.deliveryDate.split('T')[0];
          }
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error loading order:', err)
      });
    }
  }

  onSubmit() {
    console.log('Enviando orden:', this.order);

    if (this.isEditMode && this.orderId) {
      this.orderService.update(this.orderId, this.order).subscribe({
        next: () => {
          console.log('Order updated:', this.order);
          this.router.navigate(['/lists']);
        },
        error: (err) => console.error('Error updating order:', err)
      });
    } else {
      this.orderService.create(this.order).subscribe({
        next: () => {
          console.log('Order created:', this.order);
          this.router.navigate(['/lists']);
        },
        error: (err) => console.error('Error creating order:', err)
      });
    }
  }
   async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const leaflet = await import('leaflet');
      this.L = leaflet.default ?? leaflet;

      delete (this.L.Icon.Default.prototype as any)._getIconUrl;
      this.L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      this.initMap();
    }
  }

  private initMap() {
    this.map = this.L.map('map').setView([4.6097, -74.0817], 13);
    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

      
  requestAnimationFrame(() => {
    this.map.invalidateSize();
  });
  }

  searchAddress() {
    if (!this.L) return;

    const address = this.order.deliveryAddress;
    if (!address) return;

    const fullAddress = `${address}, Colombia`;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1`;

     fetch(url, {
      headers: {
        'Accept-Language': 'es'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          console.log('Encontrado:', data[0].display_name);

          this.map.setView([lat, lon], 16);

          if (this.marker) {
            this.marker.remove();
          }

          this.marker = this.L.marker([lat, lon]).addTo(this.map)
            .bindPopup(data[0].display_name)
            .openPopup();
        } else {
          alert('Dirección no encontrada');
        }
      })
      .catch(error => console.error('Error:', error));
  }
                                                                                                                                                                           
  showProductDropdown = false;
  showPaymentDropdown = false;

  selectProduct(product: string) {
    this.order.product = product;
    this.showProductDropdown = false;
  }

  selectPayment(method: string) {
    this.order.paymentMethod = method;
    this.showPaymentDropdown = false;
  }

}