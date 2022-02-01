import {useDispatch, useSelector} from 'react-redux';
import {RootState, setScreen, setStartTime} from "../store";
import ReactPlayer from "react-player";
import {createRef, useEffect, useState} from "react";
import BaseReactPlayer, {BaseReactPlayerProps} from 'react-player/base';

export default function Video() {
    const dispatch = useDispatch();
    const [time, setTime] = useState(0);
    const startTime = useSelector((state: RootState) => {
        return state.startTime
    })

    const ref = createRef<BaseReactPlayer<BaseReactPlayerProps>>()
    useEffect(() => {
        //TODO: restore playback from stored time
        console.log(ref.current)
        // if (ref.current) ref.current.seekTo(startTime, 'seconds')
    }, [ref])

    function progress(progress: any) {
        setTime(progress.playedSeconds)
        // access to player in all event handlers via event.target
        // event.target.playVideo();
    }

    function goToPhoneScreen() {
        dispatch(setScreen('phone'));
        dispatch(setStartTime(time));
    }


    return <div>
        <ReactPlayer
            ref={ref}
            url='https://www.youtube.com/watch?v=M7FIvfx5J10'
            //TODO why no auto play?
            playing={true}
            controls={false}
            width="100%"
            height="720px"
            onProgress={progress}
        />
        <div className="video-overlay" onClick={goToPhoneScreen}>Go to phone screen</div>
    </div>
}
