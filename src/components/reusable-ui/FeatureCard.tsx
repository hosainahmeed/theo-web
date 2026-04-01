/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';


interface FeaturesCardProps {
  item: any;
  index: number;
}

function FeaturesCard({ item, index }: FeaturesCardProps) {

  return (
    <div
      className="relative w-full h-auto min-h-72 sm:min-h-80 lg:min-h-96 flex flex-col rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none rounded-2xl sm:rounded-3xl"
        style={{
          backgroundImage: `radial-gradient(circle at center, #1070B715, transparent)`,
        }}
      />
      {item?.image && (
        <div className="relative w-full h-40 sm:h-48 lg:h-52 overflow-hidden">
          <Image
            src={item?.image}
            width={1200}
            height={1200}
            className="w-full h-full object-contain z-10 p-4"
            alt={item?.title}
          />
        </div>
      )}
      <div className="flex-1 px-4 sm:px-6 py-4 sm:py-5 z-10">
        <h3 className="text-black text-lg sm:text-xl font-semibold leading-tight mb-2">
          {item?.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          {item?.description}
        </p>
      </div>
    </div>
  );
}

export default FeaturesCard;