import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const BRAND_ITEMS = [
  { image: "https://download.logo.wine/logo/Airbnb/Airbnb-Logo.wine.png", alt: 'Brand 1' },
  { image: "https://static.vecteezy.com/system/resources/previews/055/138/453/non_2x/booking-com-logo-free-download-booking-com-logo-free-png.png", alt: 'Brand 2' },
  { image: "https://static.vecteezy.com/system/resources/thumbnails/055/138/466/small_2x/expedia-logo-free-download-expedia-logo-free-png.png", alt: 'Brand 3' },
  { image: "https://logos-world.net/wp-content/uploads/2022/07/Trivago-Logo.png", alt: 'Brand 4' },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/TripAdvisor_Logo.svg/3840px-TripAdvisor_Logo.svg.png", alt: 'Brand 5' }
];

function BrandShowcase() {
  return (
    <section className="relative max-w-5xl mx-auto w-full flex flex-col gap-4 overflow-hidden">
      <div className="relative pointer-events-none">
        <Marquee
          speed={38}
        >
          {[...BRAND_ITEMS, ...BRAND_ITEMS].map((item, index) => (
            <div
              key={index}
              className="group flex items-center justify-center"
            >
              <div
                className="relative flex items-center justify-center px-5 py-3 transition-all duration-300 ease-out">
                <Image
                  src={item.image}
                  width={120}
                  height={48}
                  alt={item.alt}
                  className="
                                    h-12! w-auto object-contain
                                    transition-all duration-300 ease-out
                                "
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

export default BrandShowcase;