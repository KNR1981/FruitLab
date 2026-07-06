Add-Type -AssemblyName System.Drawing

$csharpCode = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;

public class ImageProcessor {
    public static void CropAndProcess(string srcPath, string destPath, int cropX, int cropY, int cropWidth, int cropHeight, int threshold) {
        Console.WriteLine("Processing " + srcPath + " -> " + destPath);
        using (Bitmap src = new Bitmap(srcPath)) {
            using (Bitmap cropped = new Bitmap(cropWidth, cropHeight, PixelFormat.Format32bppArgb)) {
                using (Graphics g = Graphics.FromImage(cropped)) {
                    g.DrawImage(src, new Rectangle(0, 0, cropWidth, cropHeight), cropX, cropY, cropWidth, cropHeight, GraphicsUnit.Pixel);
                }
                
                using (Bitmap processed = MakeBackgroundTransparent(cropped, threshold)) {
                    processed.Save(destPath, ImageFormat.Png);
                    Console.WriteLine("Saved processed image to: " + destPath);
                }
            }
        }
    }

    public static void ProcessDirect(string srcPath, string destPath, int threshold) {
        Console.WriteLine("Processing direct " + srcPath + " -> " + destPath);
        using (Bitmap src = new Bitmap(srcPath)) {
            using (Bitmap processed = MakeBackgroundTransparent(src, threshold)) {
                processed.Save(destPath, ImageFormat.Png);
                Console.WriteLine("Saved processed image to: " + destPath);
            }
        }
    }

    private static Bitmap MakeBackgroundTransparent(Bitmap src, int threshold) {
        int width = src.Width;
        int height = src.Height;
        Bitmap dest = new Bitmap(width, height, PixelFormat.Format32bppArgb);
        
        // Copy pixels
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                dest.SetPixel(x, y, src.GetPixel(x, y));
            }
        }
        
        bool[,] visited = new bool[width, height];
        Queue<Point> queue = new Queue<Point>();
        
        // Add boundary pixels to queue
        for (int y = 0; y < height; y++) {
            AddPixelIfBlack(dest, 0, y, threshold, visited, queue);
            AddPixelIfBlack(dest, width - 1, y, threshold, visited, queue);
        }
        for (int x = 0; x < width; x++) {
            AddPixelIfBlack(dest, x, 0, threshold, visited, queue);
            AddPixelIfBlack(dest, x, height - 1, threshold, visited, queue);
        }
        
        // BFS to flood fill background
        int[] dx = { 0, 0, 1, -1 };
        int[] dy = { 1, -1, 0, 0 };
        
        while (queue.Count > 0) {
            Point p = queue.Dequeue();
            dest.SetPixel(p.X, p.Y, Color.FromArgb(0, 0, 0, 0));
            
            for (int i = 0; i < 4; i++) {
                int nx = p.X + dx[i];
                int ny = p.Y + dy[i];
                
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    if (!visited[nx, ny]) {
                        Color c = dest.GetPixel(nx, ny);
                        // Check if black/near-black
                        if (c.R <= threshold && c.G <= threshold && c.B <= threshold) {
                            visited[nx, ny] = true;
                            queue.Enqueue(new Point(nx, ny));
                        }
                    }
                }
            }
        }
        
        return dest;
    }
    
    private static void AddPixelIfBlack(Bitmap bmp, int x, int y, int threshold, bool[,] visited, Queue<Point> queue) {
        if (!visited[x, y]) {
            Color c = bmp.GetPixel(x, y);
            if (c.R <= threshold && c.G <= threshold && c.B <= threshold) {
                visited[x, y] = true;
                queue.Enqueue(new Point(x, y));
            }
        }
    }
}
"@

Add-Type -TypeDefinition $csharpCode -ReferencedAssemblies System.Drawing

# Create output folder if it doesn't exist
$assetsDir = "C:\Users\nithi\.gemini\antigravity\scratch\fruit-lab\assets"
if (!(Test-Path $assetsDir)) {
    New-Item -ItemType Directory -Path $assetsDir -Force
}

# 1. Process orange bottle (816x1024)
$orangeSrc = "C:\Users\nithi\.gemini\antigravity\scratch\fruit-lab\assets\orange_bottle.png"
$orangeDest = "C:\Users\nithi\.gemini\antigravity\scratch\fruit-lab\assets\orange_bottle_transparent.png"
[ImageProcessor]::ProcessDirect($orangeSrc, $orangeDest, 15)

# 2. Process red bottle from three_bottles.jpg (1024x831)
# Crop red bottle: x=360 to x=667 (width=307), height=831
$threeSrc = "C:\Users\nithi\.gemini\antigravity\scratch\fruit-lab\assets\three_bottles.jpg"
$redDest = "C:\Users\nithi\.gemini\antigravity\scratch\fruit-lab\assets\red_bottle_transparent.png"
[ImageProcessor]::CropAndProcess($threeSrc, $redDest, 360, 0, 307, 831, 15)

# 3. Process yellow bottle from three_bottles.jpg (1024x831)
# Crop yellow bottle: x=677 to x=984 (width=307), height=831
$yellowDest = "C:\Users\nithi\.gemini\antigravity\scratch\fruit-lab\assets\yellow_bottle_transparent.png"
[ImageProcessor]::CropAndProcess($threeSrc, $yellowDest, 677, 0, 307, 831, 15)

Write-Output "Image processing complete!"
