import AnimatedButton from '@/components/ui/animated-button';
import { IMAGE } from '@/constant/image.index';
import Image from "next/image";

function ForClnears() {
  return (
    <div
      className="bg-linear-to-b from-[#0088FF] to-white">
      <div className="max-w-7xl mx-auto  flex flex-col md:flex-row items-center justify-between px-2 gap-10 md:gap-16">
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-6 text-left">
          <h1 className="text-3xl sm:text-4xl text-center md:text-start md:text-5xl font-semibold leading-tight">
            Find High-Paying Property Cleaning Jobs
          </h1>
          <p className="text-base text-center md:text-start sm:text-lg text-gray-600">
            Connect directly with property owners and Airbnb hosts in your area. Browse available turnovers, set your own rates, and build a reliable cleaning business on your own schedule.
          </p>
          <div className="flex gap-2">
            <AnimatedButton variant='secondary' buttonText="Join as Cleaner" />
            <AnimatedButton buttonText="How it Works" />
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <Image
            className="max-w-full h-auto object-cover"
            src={IMAGE.cleaner}
            width={1200}
            height={1200}
            alt="sampli"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default ForClnears;