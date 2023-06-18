import { useRef, useEffect, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setCurrentTime } from '../../slices/videoPlayerSlice';


const VideoPlayer = () => {

    const videoRef = useRef<HTMLVideoElement>(null);

    const dispatch : AppDispatch = useDispatch()

    const  { startTime, currentTime } = useSelector((state: RootState) => state.videoPlayer)
    const { }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = startTime;
        }
    },[startTime])

    const onTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
        dispatch(setCurrentTime(e.currentTarget.currentTime));
    }

    return (
        <video ref={videoRef}  onTimeUpdate={onTimeUpdate} controls>
            <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4"/>
        </video>
    )
}

export default VideoPlayer