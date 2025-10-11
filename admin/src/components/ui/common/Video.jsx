const Video = ({ src, controls, className }) => {
    return (
        <video
            src={src}
            controls={controls}
            className={className}
        />
    )
}

export default Video;