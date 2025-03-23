import {Component, ViewEncapsulation, ChangeDetectionStrategy, Input} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCarSide, faPhoneAlt, faExchangeAlt, faUserShield} from "@fortawesome/free-solid-svg-icons";
import {FeatureDetailComponent} from "./feature-detail/feature-detail.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [
    FeatureDetailComponent,
    FaIconComponent,
    NgForOf
  ],
  templateUrl: './feature.component.html',
  styleUrls: ['../../styles.css', './feature.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeatureComponent {
  featureList = [
    { icon: faCarSide, title: 'Free Shipping', description: 'Free on order over $300' },
    { icon: faUserShield, title: 'Security Payment', description: '100% security payment' },
    { icon: faExchangeAlt, title: '30 Day Return', description: '30 day money guarantee' },
    { icon: faPhoneAlt, title: '24/7 Support', description: 'Support every time fast' }
  ];
}
