import Image from "next/image";

const BlogCard = ({ imageSrc, title }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white relative group">
      {/* Image */}
      <div className="relative h-[450px] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      {/* Hover Effect for Shadow */}
      <div className="absolute inset-0 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300 pointer-events-none"></div>
    </div>
  );
};

export default BlogCard;

