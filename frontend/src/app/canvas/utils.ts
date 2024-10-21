export function getHeightWidthWithOffset(canvasHeight: number, canvasWidth: number, imgHeight: number, imgWidth: number): any {
    const imgAspectRatio = imgWidth / imgHeight;
    const canvasAspectRatio = canvasWidth / canvasHeight;
  
    let drawWidth, drawHeight;
  
    if (imgAspectRatio > canvasAspectRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgAspectRatio;
    } else {
      drawWidth = canvasHeight * imgAspectRatio;
      drawHeight = canvasHeight;
    }
  
    const offsetX = (canvasWidth - drawWidth) / 2;
    const offsetY = (canvasHeight - drawHeight) / 2;
  
    return { offsetX: offsetX, offsetY: offsetY, height: drawHeight, width: drawWidth }
  }