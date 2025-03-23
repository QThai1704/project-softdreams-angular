import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faFacebookF, faYoutube, faTwitter, faLinkedin} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['../../styles.css', './footer.component.css']
})
export class FooterComponent {
  iconFacebook = faFacebookF;
  iconYoutube = faYoutube;
  iconTwitter = faTwitter;
  iconLinkedin = faLinkedin;
}
