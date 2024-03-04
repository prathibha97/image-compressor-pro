import { compressImage } from '@/utils/compress';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  try {
    const { file } = await req.json();
    console.log('🚀 ~ POST ~ file:', file);
    if (!file) {
      return new NextResponse('Missing image file', { status: 400 });
    }

    const compressedFile = await compressImage(file);

    const compressedImageBase64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader?.result?.toString());
      reader.readAsDataURL(compressedFile);
    });

    return NextResponse.json({ compressedImage: compressedImageBase64 });
  } catch (error: any) {
    console.error(error.message);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
