import { Component, Input, input, NgModule, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  @Input() cidade:string = "Serra";
}
