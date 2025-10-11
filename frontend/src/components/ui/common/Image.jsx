const Image = ({ src, alt, className, onError }) => {
    return (
        <>
            <img
                src={src}
                alt={alt}
                className={className}
                onError={onError}
            />
        </>
    )
}

export default Image;