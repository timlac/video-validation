import VideoPlayer from "./PlayVideoFromS3Bucket";

export default function VideoExample() {
    const fileKey = "A327_cont_v_4.mov"
    const fileType = "mov"

    return <VideoPlayer fileKey={fileKey} fileType={fileType} />
}