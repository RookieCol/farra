import SDFGeometry from '@/components/SDFGeometry';

function Home() {
    return (
      <section className='flex flex-col justify-center items-center px-4 py-8 md:py-12 w-full min-h-full'>
        <div className='w-full max-w-4xl flex flex-col items-center gap-6 md:gap-8 my-auto'>
          <div className='w-full max-w-md md:max-w-lg lg:max-w-xl aspect-square flex items-center justify-center flex-shrink-0'>
            <SDFGeometry />
          </div>
          <h1 className='text-lg md:text-xl lg:text-2xl font-orbitron font-semibold text-center px-4 flex-shrink-0'>
            Tokenizing one event at a time
          </h1>
        </div>
      </section>
    )
}

export default Home