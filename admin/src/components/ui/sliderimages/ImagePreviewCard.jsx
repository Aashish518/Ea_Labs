import { Trash2, Eye, Play, EyeOff } from 'lucide-react';
import Button from '../common/Button';
import Video from '../common/Video';
import Image from '../common/Image';

const ImagePreviewCard = ({ image, onDelete, onView, onToggleVisibility, index, isNew }) => {
    const isVideo = image?.type === 'video';
    const visible = image?.isVisible ?? true; 

    return (
        <div className="relative group rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {isVideo ? (
                    <Video
                        src={`http://localhost:7000${image.url}`}
                        controls={false}
                        className="w-full h-full"
                    />
                ) : (
                    <Image
                        src={`http://localhost:7000${image.url}`}
                        alt={`Media ${index + 1}`}
                        className="w-full h-full"
                    />
                )}
            </div>

            <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/50 
                transition-all duration-300 flex items-center justify-center gap-2 
                opacity-100 md:opacity-0 md:group-hover:opacity-100">

                <Button
                    onClick={onView}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    title="View"
                >
                    {isVideo ? <Play className="w-5 h-5 text-gray-700" /> : <Eye className="w-5 h-5 text-gray-700" />}
                </Button>

                <Button
                    onClick={onDelete}
                    className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                    title="Delete"
                >
                    <Trash2 className="w-5 h-5 text-white" />
                </Button>

                <div
                    onClick={onToggleVisibility}
                    className={`flex items-center cursor-pointer w-14 h-7 rounded-full transition-colors duration-300 ${visible ? "bg-green-500" : "bg-gray-400"
                        }`}
                >
                    <div
                        className={`flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${visible ? "translate-x-7" : "translate-x-1"
                            }`}
                    >
                        {visible ? (
                            <EyeOff className="w-4 h-4 text-green-600" />
                        ) : (
                            <Eye className="w-4 h-4 text-gray-600" />
                        )}
                    </div>
                </div>
            </div>

            <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded z-10">
                {index + 1}
            </div>

            {isNew && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded z-10">
                    NEW
                </div>
            )}
        </div>
    );
};

export default ImagePreviewCard;
