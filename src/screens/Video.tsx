import {useDispatch} from 'react-redux';
import {setScreen} from "../store";

export default function Video(){
    const dispatch = useDispatch();
    return <div onClick={()=>dispatch(setScreen('phone'))}>
        Video
    </div>
}
