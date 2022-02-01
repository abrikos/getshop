import {useDispatch} from 'react-redux';
import {setScreen} from "../store";

export default function Phone(){
    const dispatch = useDispatch();
    return <div>
        <button onClick={()=>dispatch(setScreen('video'))}>Back</button>
        Phone
    </div>
}
