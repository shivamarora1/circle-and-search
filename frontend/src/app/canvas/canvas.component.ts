import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { getHeightWidthWithOffset } from './utils';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent {
  @ViewChild("imageCanvas", { static: true }) private canvas: ElementRef = {} as ElementRef;
  @Output() onCropButtonClick = new EventEmitter<string>();


  private context!: CanvasRenderingContext2D | null;
  private path: Path2D = new Path2D();
  private isDrawing: boolean = false;
  private canvasImage: HTMLImageElement = new Image();

  isCropBtnDisabled: boolean = true;
  isImageUploaded: boolean = false;

  constructor() {

  }
  ngOnInit(): void {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    this.context = canvas.getContext("2d");
    this.addEventsToCanvas()

    // * loading default image
    const img = new Image();
    img.src = "image.jpg"

    img.onload = () => {
      if (this.context) {
        const canvas: HTMLCanvasElement = this.canvas.nativeElement;
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        const dimensions = getHeightWidthWithOffset(canvas.height, canvas.width, img.height, img.width);
        this.context.drawImage(img, dimensions.offsetX, dimensions.offsetY, dimensions.width, dimensions.height);
      }
    };
    // * end of loading default image

  }
  addEventsToCanvas() {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement
    canvas.addEventListener('mousedown', (e) => {
      if (this.isImageUploaded) {
        this.isCropBtnDisabled = false;
        this.isDrawing = true;
        this.path.moveTo(e.offsetX, e.offsetY);
      }
    });

    canvas.addEventListener('mousemove', (e) => {
      if (this.isDrawing) {
        this.path.lineTo(e.offsetX, e.offsetY);
        this.context?.stroke(this.path);
      }
    });

    canvas.addEventListener('mouseup', () => {
      this.isDrawing = false;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        this.canvasImage = img;

        img.onload = () => {
          this.drawImageInsideCanvas();
        };
      };
      reader.readAsDataURL(file);

      this.isCropBtnDisabled = true;
      this.isImageUploaded = true;
    }
  }
  onUploadClick(): void {
    const fileInput = document.getElementById("fileInput") as HTMLElement
    fileInput.click();
  }
  onCropClick(event: Event): void {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    var croppedCanvas: HTMLCanvasElement = document.createElement('canvas');
    croppedCanvas.width = 400;
    croppedCanvas.height = 400;
    croppedCanvas.style.border = "1px solid #000";

    const croppedContext: CanvasRenderingContext2D | null = croppedCanvas.getContext('2d');
    croppedContext?.clearRect(0, 0, croppedCanvas.width, croppedCanvas.height);
    croppedContext?.beginPath();
    croppedContext?.clip(this.path);
    croppedContext?.drawImage(canvas, 0, 0);
    croppedContext?.closePath();

    const dataURL = croppedCanvas.toDataURL('image/png');
    this.onCropButtonClick.emit(dataURL);

    this.drawImageInsideCanvas()
    this.path = new Path2D()
    this.isCropBtnDisabled = true;
  }

  drawImageInsideCanvas(): void {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    const img = this.canvasImage;
    const dimensions = getHeightWidthWithOffset(canvas.height, canvas.width, img.height, img.width);

    this.context?.clearRect(0, 0, canvas.width, canvas.height);
    this.context?.drawImage(img, dimensions.offsetX, dimensions.offsetY, dimensions.width, dimensions.height);
  }
}