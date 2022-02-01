import React from 'react';
import './app.sass';
import FirstScreen from "./components/FirstScreen";
import SecondScreen from "./components/SecondScreen";
import {useSelector} from 'react-redux';
import {RootState} from "./store";

function App() {
    const screen = useSelector((state: RootState) => {
        return state.screen
    })
    return (
        <main>
            {screen === 'first' && <FirstScreen/>}
            {screen === 'second' && <SecondScreen/>}
        </main>
    );
}

export default App;
