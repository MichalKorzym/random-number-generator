import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-random-number-main',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './random-number-main.component.html',
  styleUrl: './random-number-main.component.scss',
})
export class RandomNumberMainComponent {}
