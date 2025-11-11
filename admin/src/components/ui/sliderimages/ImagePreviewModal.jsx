import { X } from "lucide-react";
import Button from "../common/Button";
import Video from "../common/Video";
import Image from "../common/Image";

const ImagePreviewModal = ({ image, onClose }) => {
    if (!image) return null;

    const isVideo = image?.type === "video" 

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-all duration-300"
            onClick={onClose}
        >
            <div
                className="relative max-w-5xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <Button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                    aria-label="Close preview"
                >
                    <X className="w-8 h-8" />
                </Button>

                <div className="relative overflow-hidden rounded-lg">
                    {isVideo ? (
                        <Video
                            src={`${import.meta.env.VITE_BACK_URL}${image.url}`}
                            controls
                            autoPlay
                            className="max-w-full max-h-[90vh] rounded-lg"
                        />
                    ) : (
                        <Image
                            src={`${import.meta.env.VITE_BACK_URL}${image.url}`}
                            alt="Preview"
                            className="max-w-full max-h-[90vh] rounded-lg"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImagePreviewModal;
