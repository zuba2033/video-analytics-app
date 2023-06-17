import { useEffect } from 'react';
import { loadAnalyticsData } from '../../slices/analyticsDataSlice';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';

const AnalyticsDataList = () => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
      dispatch(loadAnalyticsData());
    }, [dispatch])

    

    return (
        <ul>

        </ul>
    )
}

export default AnalyticsDataList;