Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('e:\aries\aurem billing\logo.png')
$bmp = new-object System.Drawing.Bitmap($img.Width, $img.Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$ia = new-object System.Drawing.Imaging.ImageAttributes
$cm = new-object System.Drawing.Imaging.ColorMatrix
$cm.Matrix00 = 0; $cm.Matrix01 = 0; $cm.Matrix02 = 0;
$cm.Matrix10 = 0; $cm.Matrix11 = 0; $cm.Matrix12 = 0;
$cm.Matrix20 = 0; $cm.Matrix21 = 0; $cm.Matrix22 = 0;
$cm.Matrix33 = 1; 
$ia.SetColorMatrix($cm)
$rect = new-object System.Drawing.Rectangle(0, 0, $img.Width, $img.Height)
$g.DrawImage($img, $rect, 0, 0, $img.Width, $img.Height, [System.Drawing.GraphicsUnit]::Pixel, $ia)
$bmp.Save('e:\aries\aurem billing\logo_black.png', [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
$img.Dispose()
