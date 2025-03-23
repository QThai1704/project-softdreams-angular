import {Component, Input, ViewEncapsulation} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";


@Component({
  selector: 'app-feature-detail',
  standalone: true,
  imports: [
    FaIconComponent

  ],
  templateUrl: './feature-detail.component.html',
  styleUrls: ['./feature-detail.component.css', '../../../styles.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeatureDetailComponent {
  @Input() data: any;
}
