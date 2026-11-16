export type ServiceCategory =
  | 'Meta Ads Management'
  | 'Website Design'
  | 'Social Media Marketing';

export interface ProjectItem {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  imageUrl: string;
  projectUrl: string;
  createdAt: number;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  service: ServiceCategory;
  quote: string;
}

export async function compressImageFile(
  file: File,
  maxWidth = 1200,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file.'));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
