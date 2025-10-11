
/**
 * A banner component that displays a quality control message.
 */
export default function QualityControlBanner() {
    return (
        <div className="bg-[#e6fffa] py-11 rounded-xl w-full mb-6 ">
            <h2 className="text-3xl md:text-4xl font-extrabold sm:text-center px-4">
                <span className="text-red-600">3-Level Quality Control</span>
                <span className="text-indigo-900"> on Every Batch.</span>
            </h2>
        </div>
    );
}
