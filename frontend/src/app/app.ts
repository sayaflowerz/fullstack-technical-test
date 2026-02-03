import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './app.html',
  styleUrl: './app.css'
 })
 export class App {
  constructor(public router: Router) {}
}
