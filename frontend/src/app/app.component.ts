import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';


  constructor(private dataService: DataService) {

  }
  sendData(event: any) {
    const postData = {
      title: 'Wireless Bluetooth Headphones',
      rating: 4.5,
      description: 'High-quality wireless Bluetooth headphones with noise cancellation.',
      actual_price: 99.99,
      discount_price: 79.99
    };

    this.dataService.postData(postData).subscribe(response => {
      console.log('Data posted successfully:', response);
    }, error => {
      console.error()
    });
  }
}
