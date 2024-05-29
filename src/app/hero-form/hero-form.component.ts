import { Component } from '@angular/core';

import { Hero } from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent {

  powers = ['SuperFuerza', 'Explosión',
            'Fuego', 'Otro'];

  model = new Hero(18, 'Dr. IQ', this.powers[3], 'Chuck Overstreet');

  submitted = false;

  onSubmit() { this.submitted = true; }
  
  newHero() {
    this.model = new Hero(42, '', '');
  }

}