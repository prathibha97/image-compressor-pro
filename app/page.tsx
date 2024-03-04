import Link from 'next/link';

const Home = () => {
  return (
    <main className='bg-gray-100'>
      <section className='bg-blue-500 text-white py-20'>
        <div className='container mx-auto text-center'>
          <h1 className='text-5xl font-bold mb-4'>Image Compressor Pro</h1>
          <p className='text-lg mb-8'>
            Compress and optimize your images effortlessly with our SAAS
            solution.
          </p>
          <Link href='/compress'>
            <button className='bg-white text-blue-500 px-6 py-2 rounded-full font-semibold hover:bg-blue-700 hover:text-white'>
              Get Started
            </button>
          </Link>
        </div>
      </section>

      <section className='py-16'>
        <div className='container mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-8'>How It Works</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='p-6 bg-white rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-4'>Upload Images</h3>
              <p className='text-gray-600'>
                Easily upload multiple images in various formats.
              </p>
            </div>

            <div className='p-6 bg-white rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-4'>
                Automatic Compression
              </h3>
              <p className='text-gray-600'>
                Our advanced algorithms compress your images without quality
                loss.
              </p>
            </div>

            <div className='p-6 bg-white rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-4'>
                Download Optimized Images
              </h3>
              <p className='text-gray-600'>
                Download your compressed images ready for use on your website or
                app.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-blue-500 text-white py-20'>
        <div className='container mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-4'>
            Start Optimizing Your Images Today!
          </h2>
          <p className='text-lg mb-8'>
            Sign up now and enhance your website&apos;s performance with
            optimized images.
          </p>
          <button className='bg-white text-blue-500 px-6 py-2 rounded-full font-semibold hover:bg-blue-700 hover:text-white'>
            Sign Up Now
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
