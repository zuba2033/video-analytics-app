import { MouseEvent, useEffect } from 'react';
import { loadAnalyticsData, sortedDataSelector } from '../../slices/slice';
import { setStartTime } from '../../slices/slice';
import { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { iAnalyticsData } from '../../slices/slice';
import { RootState } from '../../store/store';
import Spinner from '../Spinner/Spinner';


const AnalyticsDataList = () => {
    const dispatch: AppDispatch = useDispatch();

    const onTimestampClick = (e: MouseEvent<HTMLSpanElement>) => {
        if (e.currentTarget.dataset.value) dispatch(setStartTime(+e.currentTarget.dataset.value/1000));
    }

    useEffect(() => {
      dispatch(loadAnalyticsData());
    }, [dispatch])

    const data : iAnalyticsData[] = useSelector(sortedDataSelector);
    const { loadingStatus } = useSelector((state : RootState) => state.analyticsData);

    const convertToTime = (timestamp : number) : string => {
        let milliseconds : string | number = timestamp % 1000;
        let seconds : string | number = Math.floor(timestamp / 1000);
        let minutes : string | number= Math.floor(seconds / 60);
      
        seconds = seconds % 60;
        milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
      
        return `${minutes}:${seconds}:${milliseconds}`;
    }

    const createList = (data : iAnalyticsData[]) : JSX.Element => {
        return (
            <>
                {loadingStatus === 'loading' ? 
                    <Spinner/> :
                    (<>
                        <h2>Events:</h2>
                        <ul >
                            {data.map((item, i) => {
                                return (
                                    <li key={i}>
                                        <div >
                                            <span>{i+1}:</span>
                                            <span className='timestamp-link' 
                                                data-value={item.timestamp} 
                                                onClick={(e) => onTimestampClick(e)}>
                                                {convertToTime(item.timestamp)}
                                            </span>
                                        </div>  
                                    </li>
                                )
                            })}
                        </ul>
                    </>)}
            </>
        )
    }

    return (
        <>
            {createList(data)}
        </>
    )
}

export default AnalyticsDataList;