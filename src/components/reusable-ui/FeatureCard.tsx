import Image from 'next/image';


function FeaturesCard(item: any) {

  return (
    <div
      style={{ border: '.5px solid #cdcdcd4a' }}
      className="relative h-full aspect-video p-3 flex md:border-none rounded-3xl items-start justify-between flex-col"
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none rounded-3xl"
        style={{
          backgroundImage: `radial-gradient(circle at center, #1070B780, transparent)`,
        }}
      />
      {item?.image && (
        <Image
          src={item?.image}
          width={1200}
          height={1200}
          className="w-full z-10 object-contain h-62 aspect-video"
          alt={item?.title}
        />
      )}
      <div className="px-4 py-2">
        <h1 className="text-black text-2xl md:text-3xl font-semibold">
          {item?.title}
        </h1>
        <h1 className="text-sm text-black/80">
          {item?.description}
        </h1>
      </div>
    </div>
  );
}

export default FeaturesCard;