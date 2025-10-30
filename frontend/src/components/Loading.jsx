const Loading = ({message}) => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-900 font-medium">{message}</p>
            </div>
        </div>
    );
}

export default Loading;