import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {RootState, setAgreement, setPhoneValid} from "../store";

interface FuncProps {
    addToPhone: (values: number | string) => void;
    removeFromPhone: () => void;
    getNavigationId: (v: number) => string;
    validatePhone: () => boolean;
}

export default function PhoneInput(props: FuncProps) {
    const {addToPhone, removeFromPhone, getNavigationId, validatePhone} = props;
    const phone = useSelector((state: RootState) => {
        return state.phone
    });
    const agreement = useSelector((state: RootState) => {
        return state.agreement
    });

    const numbers: number[] = Array.apply(null, Array(9)).map((x, i) => i + 1);
    const dispatch = useDispatch();

    function formatPhone() {
        return `+7(${phoneDigit(0)}${phoneDigit(1)}${phoneDigit(2)})${phoneDigit(3)}${phoneDigit(4)}${phoneDigit(5)}-${phoneDigit(6)}${phoneDigit(7)}-${phoneDigit(8)}${phoneDigit(9)}`;
    }

    function phoneDigit(i: number) {
        return phone.length > i ? phone[i] : '_';
    }

    return <div className="phone-input-container">
        <h3>Введите ваш номер
            мобильного телефона</h3>
        <div className="phone-input">
            {formatPhone()}
        </div>
        <div className="text-under-phone">
            и с Вами свяжется наш менеждер для дальнейшей консультации
        </div>
        <div className="digits">
            {numbers.map((n) => <div key={n} className="btn navigation digit" onClick={() => addToPhone(n)}
                                     id={getNavigationId(n)}>
                {n}
            </div>)}
            <div className="btn navigation" onClick={removeFromPhone} id={getNavigationId(10)}>Стереть</div>
            <div className="btn navigation digit" onClick={() => addToPhone(0)} id={getNavigationId(11)}>0</div>
        </div>
        <div className="agreement">
            <div>
                <div className="check-box navigation" onClick={() => dispatch(setAgreement(!agreement))}
                     id={getNavigationId(12)}>
                    {agreement && <FontAwesomeIcon icon={faCheck}/>}
                </div>
            </div>
            <div>
                <div className="agree-text">
                    Согласие на обработку персональных данных
                </div>
            </div>
        </div>
        <div className={`accept navigation ${validatePhone() && 'active'}`}
             onClick={() => validatePhone() && dispatch(setPhoneValid(true))} id={getNavigationId(13)}>
            Подтвердить номер
        </div>
    </div>
}
