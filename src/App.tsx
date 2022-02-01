import React from 'react';
import './app.sass';
import Video from "./screens/Video";
import Phone from "./screens/Phone";
import Final from "./screens/Final";
import {useSelector} from 'react-redux';
import {RootState} from "./store";

function App() {
    const screen = useSelector((state: RootState) => {
        return state.screen
    })
    return (
        <main>
            {screen === 'video' && <Video/>}
            {screen === 'phone' && <Phone/>}
            {screen === 'final' && <Final/>}
        </main>
    );
}

export default App;
