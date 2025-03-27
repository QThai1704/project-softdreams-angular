import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent {
  constructor(private router: Router) {}
  directSuccess(){
    this.router.navigate(['../thanks']).then();
  }
}
