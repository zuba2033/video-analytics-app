import { useRef, useEffect, useState, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const VideoPlayer = () => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [currentTime, setCurrentTime] = useState<number>(0);

    const { analyticsData, startTime } = useSelector((state: RootState) => state.analyticsData);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = startTime;
        }
    },[startTime]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        
        if (canvas && video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
        
            let animFrame: number;
        
            const drawSquares = () => {

                if(!analyticsData) return;
                
                analyticsData.forEach(({ timestamp, duration, zone }) => {
                const squareStart = timestamp/1000;
                const squareEnd = (timestamp + duration)/1000;
        
                if (currentTime >= squareStart && currentTime < squareEnd) {
                    const x = zone.left;
                    const y = zone.top;
                    const width = zone.width;
                    const height = zone.height;
        
                    ctx.fillStyle = 'green';
                    ctx.fillRect(x, y, width, height);
                }
                });
                animFrame = requestAnimationFrame(drawSquares);
            };
        
            drawSquares();
        
            return () => cancelAnimationFrame(animFrame);
        }
    }, [currentTime, analyticsData]);
        
      
    const onTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
        setCurrentTime(e.currentTarget.currentTime);
    }

    return (
        <div className='video-wrap'>
            <canvas ref={canvasRef} />
            <video ref={videoRef}  onTimeUpdate={onTimeUpdate} controls>
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4"/>
            </video>
        </div>

    )
}

export default VideoPlayer;