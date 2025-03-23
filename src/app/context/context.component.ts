import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {HomeComponent} from "../home/home.component";
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-context',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    RouterModule
  ],
  templateUrl: './context.component.html',
  styleUrl: './context.component.css'
})
export class ContextComponent {

}
