import React, {useState} from 'react';
import './app.sass';
import Video from "./screens/Video";
import Phone from "./screens/Phone";
import Final from "./screens/Final";

function App() {
    const [screen, setScreen] = useState('video')
  return (
    <main>
        {screen==='video' && <Video/>}
        {screen==='phone' && <Phone/>}
        {screen==='final' && <Final/>}
    </main>
  );
}

export default App;
