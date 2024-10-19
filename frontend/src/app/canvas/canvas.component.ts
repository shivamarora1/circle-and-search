import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent {
  @ViewChild("imageCanvas",{static: true}) private canvas: ElementRef = {} as ElementRef;
  context!: CanvasRenderingContext2D | null;

  constructor() {

  }
  ngOnInit(): void {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    this.context = canvas.getContext("2d");
  // this.context = (this.canvas.nativeElement as HTMLCanvasElement).getContext("2d");
  }
}
