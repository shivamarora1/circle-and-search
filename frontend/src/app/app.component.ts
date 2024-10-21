import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';
import { DataService } from './data.service';
import { SearchResultComponent } from './search-result/search-result.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CanvasComponent, SearchResultComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  searchResult: Array<any> = [];

  constructor(private dataService: DataService) {

  }
  onCropButtonClicked(event: any) {
    console.log(event);
    const postData = {
      base64Img: event,
    };

    this.dataService.postData(postData).subscribe(response => {
      console.log('Data posted successfully:', response);
      this.searchResult = response;
    }, error => {
      console.error()
    });
  }
}
