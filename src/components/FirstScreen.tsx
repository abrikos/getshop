import {useDispatch, useSelector} from 'react-redux';
import {RootState, setScreen, setStartTime} from "../store";
import ReactPlayer from "react-player/youtube";
import React, {RefObject, useEffect, useState} from "react";
import qr from '../static/qr.svg'

export default function FirstScreen() {
    const dispatch = useDispatch();
    const [time, setTime] = useState(0);
    const [play, setPlay] = useState(true);
    const startTime = useSelector((state: RootState) => {
        return state.startTime
    })

    function progress(progress: any) {
        setTime(progress.playedSeconds)
    }

    function goToPhoneScreen() {
        dispatch(setScreen('second'));
        dispatch(setStartTime(time));
    }

    const playerRef: RefObject<any> = React.createRef();

    useEffect(()=>{
        playerRef.current.seekTo(startTime)
    }, [startTime])
    return <div className="first-screen">
        <ReactPlayer
            ref={playerRef}
            url='https://www.youtube.com/watch/M7FIvfx5J10?enablejsapi=1&autoplay=1&muted=1@autopause=0'
            playing={true}
            muted={true}
            controls={false}
            width="100%"
            height="720px"
            onProgress={progress}
            loop={true}
        />
        <div className="video-overlay" onClick={() => setPlay(!play)}>
            {time > 5 && <div className="banner bg-blue">
                <div>
                    ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША!
                    ПОДАРИТЕ ЕМУ СОБАКУ!
                </div>
                <img src={qr} alt="qr"/>
                <div>
                    Сканируйте QR-код
                    или нажмите ОК
                </div>
                <button onClick={goToPhoneScreen}>OK</button>
            </div>}
        </div>
    </div>
}
