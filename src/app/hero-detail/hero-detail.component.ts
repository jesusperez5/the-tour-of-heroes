import { Component, Input} from '@angular/core';
import { Hero } from '../hero';
import { NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
  imports: [
    NgIf,
    FormsModule,
    UpperCasePipe
  ]
})
export class HeroDetailComponent {
  @Input() hero?: Hero;
}
