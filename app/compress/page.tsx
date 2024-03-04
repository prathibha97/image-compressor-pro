'use client';
import JSZip from 'jszip';
import NextImage from 'next/image';
import { ChangeEvent, useState } from 'react';

interface CompressedImage {
  url: string;
  name: string;
}

const CompressPage: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [compressedImages, setCompressedImages] = useState<CompressedImage[]>(
    []
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFiles(files ? Array.from(files) : []);
  };

  const compressImages = () => {
    if (!selectedFiles.length) {
      console.error('Please select at least one image file');
      return;
    }

    const compressedImagesPromises = selectedFiles.map((file: File) => {
      return new Promise<CompressedImage>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (event) => {
          const imageDataUrl = event.target?.result?.toString() || '';
          const img = new Image();
          img.src = imageDataUrl;

          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
              reject(new Error('Could not create canvas context'));
              return;
            }

            const maxWidth = 800;
            const maxHeight = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
              }
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
              (blob) => {
                const compressedImageURL = URL.createObjectURL(blob!);
                resolve({ url: compressedImageURL, name: file.name });
              },
              'image/jpeg',
              0.9
            );
          };
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(compressedImagesPromises)
      .then((compressedImages) => {
        setCompressedImages(compressedImages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDownload = (index: number) => {
    if (compressedImages[index]) {
      const link = document.createElement('a');
      link.href = compressedImages[index].url;
      link.download = compressedImages[index].name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error(
        `No compressed image available for download at index ${index}`
      );
    }
  };

  const handleDownloadAll = () => {
    if (compressedImages.length > 0) {
      const zip = new JSZip();
      compressedImages.forEach((image, index) => {
        const filename = image.name;
        zip.file(
          filename,
          fetch(image.url).then((response) => response.blob())
        );
      });

      zip.generateAsync({ type: 'blob' }).then((content) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'compressed_images.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } else {
      console.error('No compressed images available for download');
    }
  };

  return (
    <div className='container mx-auto p-8 bg-gray-100 rounded-lg shadow-md'>
      <h1 className='text-4xl text-center font-bold mb-6'>Image Compressor</h1>

      <div className='flex items-center justify-center gap-4'>
        <label className='block mb-4'>
          Select Images:
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            multiple
            className='mt-2 p-2 border border-gray-300 rounded-md ml-4'
          />
        </label>

        <button
          onClick={compressImages}
          className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700'
        >
          Compress Images
        </button>
      </div>

      {compressedImages.length > 0 && (
        <div className='mt-8'>
          <h2 className='text-2xl font-semibold mb-4'>Compressed Images</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {compressedImages.map((image, index) => (
              <div key={index} className='mb-4'>
                <NextImage
                  src={image.url}
                  alt={`Compressed ${index}`}
                  width={200}
                  height={200}
                  className='rounded-md'
                />
                <button
                  onClick={() => handleDownload(index)}
                  className='mt-2 bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700'
                >
                  Download Image {image.name}
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleDownloadAll}
            className='mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700'
          >
            Download All Images
          </button>
        </div>
      )}
    </div>
  );
};

export default CompressPage;
