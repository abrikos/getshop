import {useDispatch, useSelector} from 'react-redux';
import {RootState, setPhoneNumber, setScreen} from "../store";
import PhoneInput from "./PhoneInput";
import PhoneAccepted from "./PhoneAccepted";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default function SecondScreen() {
    const dispatch = useDispatch();
    const phone = useSelector((state: RootState) => {
        return state.phone
    })


    return <div className="second-screen">
        <div className="left bg-blue">
            {!phone && <PhoneInput/>}
            {phone && <PhoneAccepted/>}
        </div>
        <div className="right">
            <button onClick={() =>phone ? dispatch(setPhoneNumber('')) : dispatch(setScreen('first'))}>
                <FontAwesomeIcon icon={faWindowClose}/>
            </button>
        </div>
    </div>
}