import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  orderId?: number;
  customerName: string;
  customerId: string;
  product: string;
  quantity: number;
  deliveryDate: string;
  deliveryAddress: string;
  paymentMethod: string;
  contactPhone: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5053/api/Orders';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  update(id: number, order: Order): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, order);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}