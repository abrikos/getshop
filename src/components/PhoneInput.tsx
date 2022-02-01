import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setPhoneNumber} from "../store";

export default function PhoneInput() {
    const [phone, setPhone] = useState('');
    const [agreement, setAgreement] = useState(false);
    const numbers: number[] = Array.apply(null, Array(9)).map((x, i) => i + 1);
    const dispatch = useDispatch();
    // @ts-ignore
    const upHandler = ({key}) => {
        if (key.match(/[0-9]/)) addToPhone(key);
        if(key==='Backspace') removeFromPhone();
    };
    useEffect(() => {
        window.addEventListener("keyup", upHandler);
        return () => {
            window.removeEventListener("keyup", upHandler);
        };
    }, []);

    function formatPhone() {
        return `+7 (${phoneDigit(0)}${phoneDigit(1)}${phoneDigit(2)})${phoneDigit(3)}${phoneDigit(4)}${phoneDigit(5)}-${phoneDigit(6)}${phoneDigit(7)}-${phoneDigit(8)}${phoneDigit(9)}`;
    }

    function validate() {
        return agreement && phone.match(/[0-9]{10}/);
    }

    function phoneDigit(i: number) {
        return phone.length > i ? phone[i] : '_';
    }

    function addToPhone(n: number | string) {
        if (phone.length > 9) return;
        setPhone(currentState => `${currentState}${n}`);
    }

    function removeFromPhone() {
        setPhone(currentState => currentState.slice(0, -1));
    }

    return <div className="phone-input-container">
        Введите ваш номер
        мобильного телефона
        <div className="phone-input">
            {formatPhone()}
        </div>
        <small>
            и с Вами свяжется наш менеждер для дальнейшей консультации
        </small>
        <div className="digits">
            {numbers.map(n => <div key={n} className="btn" onClick={() => addToPhone(n)}>{n}</div>)}
            <div className="btn" onClick={removeFromPhone}>Стереть</div>
            <div className="btn" onClick={() => addToPhone(0)}>0</div>
        </div>
        <div className="agreement">
            <div>
                <div className="check-box" onClick={() => setAgreement(!agreement)}>
                    {agreement && <FontAwesomeIcon icon={faCheck}/>}
                </div>
            </div>
            <div>
                <div className="agree-text">
                    Согласие на обработку персональных данных
                </div>
            </div>
        </div>
        <div className={`accept ${validate() && 'active'}`} onClick={() =>validate() &&  dispatch(setPhoneNumber(phone))}>
            Подтвердить номер
        </div>
    </div>
}