import {useDispatch, useSelector} from 'react-redux';
import {RootState, setScreen, setStartTime} from "../store";
import ReactPlayer, {YouTubeConfig} from "react-player/youtube";
import {createRef, useState} from "react";
import BaseReactPlayer, {BaseReactPlayerProps} from 'react-player/base';
import qr from '../static/qr.svg'

export default function FirstScreen() {
    const dispatch = useDispatch();
    const [time, setTime] = useState(0);
    const [play, setPlay] = useState(true);
    const startTime = useSelector((state: RootState) => {
        return state.startTime
    })
    const ref = createRef<BaseReactPlayer<BaseReactPlayerProps>>()

    const config: YouTubeConfig = {
        playerVars: {start: startTime}
    }

    function progress(progress: any) {
        setTime(progress.playedSeconds)
    }

    function goToPhoneScreen() {
        dispatch(setScreen('phone'));
        dispatch(setStartTime(time));
    }


    return <div className="first-screen">
        <ReactPlayer
            ref={ref}
            key={startTime}
            url='https://www.youtube.com/watch?v=M7FIvfx5J10'
            //why sometimes no autoplay?
            playing={play}
            controls={false}
            width="100%"
            height="720px"
            onProgress={progress}
            loop={true}
            //why after redraw time does not apply?
            config={config}
        />
        <div className="video-overlay" onClick={()=>setPlay(!play)}>
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
