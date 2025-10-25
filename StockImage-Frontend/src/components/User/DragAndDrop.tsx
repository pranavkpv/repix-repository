import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { type TImage } from "../../types/image.types";
import { GripVertical, Image as ImageIcon } from "lucide-react";

const ItemTypes = {
  IMAGE: "image",
};

const ImageCard = ({
  image,
  index,
  moveImage,
  baseUrl,
}: {
  image: TImage;
  index: number;
  moveImage: (from: number, to: number) => void;
  baseUrl: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.IMAGE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.IMAGE,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`relative group rounded-2xl shadow-lg overflow-hidden bg-white transition-all duration-300 cursor-move ${ isDragging ? "opacity-40 scale-95 rotate-2" : "opacity-100 scale-100"
        } ${ isOver ? "ring-4 ring-purple-400 shadow-2xl scale-105" : "hover:shadow-2xl hover:scale-[1.02]"
        }`}
    >
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-lg">
          <GripVertical className="w-4 h-4 text-purple-600" />
        </div>
      </div>
      {isDragging && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm z-20 flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-3 shadow-xl">
            <ImageIcon className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      )}
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
        <img
          src={baseUrl}
          alt={image.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/90 via-purple-800/70 to-transparent p-4 pt-8">
        <p className="text-white font-semibold text-sm truncate drop-shadow-lg">
          {image.title}
        </p>
        <p className="text-purple-200 text-xs mt-0.5">
          Position #{index + 1}
        </p>
      </div>
      {isOver && (
        <div className="absolute inset-0 border-4 border-dashed border-purple-400 bg-purple-50/30 backdrop-blur-sm z-10 rounded-2xl pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl">
            Drop Here
          </div>
        </div>
      )}
      {isDragging && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      )}
    </div>
  );
};

export default ImageCard;
