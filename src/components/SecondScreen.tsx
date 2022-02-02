import {useDispatch, useSelector} from 'react-redux';
import {RootState, setAgreement, setPhoneNumber, setPhoneValid, setScreen} from "../store";
import PhoneInput from "./PhoneInput";
import PhoneAccepted from "./PhoneAccepted";
import {useEffect, useState} from "react";
import closeBtn from '../static/btn-close.svg'
import Slider from "./Slider";

export default function SecondScreen() {
    const dispatch = useDispatch();
    const [navigate, setNavigate] = useState(0);
    const phoneValidated = useSelector((state: RootState) => {
        return state.phoneValidated
    });
    const agreement = useSelector((state: RootState) => {
        return state.agreement
    });

    const phone = useSelector((state: RootState) => {
        return state.phone
    });

    // @ts-ignore
    const upHandler = ({key}) => {
        if (key.match(/[0-9]/)) addToPhone(key);
        if (key === 'Backspace') removeFromPhone();
        if (key === 'Enter' && navigate > 0 && navigate < 10) addToPhone(navigate);
        if (key === 'Enter' && navigate === 10) removeFromPhone();
        if (key === 'Enter' && navigate === 12) dispatch(setAgreement(!agreement));
        if (key === 'Enter' && navigate === 13) validatePhone() && dispatch(setPhoneValid(true));
        if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(key)) ArrowNavigation(key);

    };

    function validatePhone() {
        return agreement && !!phone.match(/[0-9]{10}/);
    }

    function ArrowNavigation(key: string) {
        let shift = navigate;
        if (key === 'ArrowRight') {
            if (!agreement && shift === 12) {
                shift = 14
            } else {
                shift++;
            }
        }
        if (key === 'ArrowLeft') {
            if (!agreement && shift === 14) {
                shift = 12
            } else {
                shift--;
            }
        }
        if (key === 'ArrowDown') {
            if (shift === 8) {
                shift = 10;
            } else if (shift === 9) {
                shift = 11;
            } else if ([10, 11].includes(shift)) {
                shift = 12;
            } else if (shift === 12) {
                if (agreement) {
                    shift = 13;
                } else {
                    shift = 14;
                }
            } else {
                shift = shift ? shift + 3 : 1;
            }
        }
        if (key === 'ArrowUp') {

            if (shift === 13) {
                shift = 12;
            } else if (shift === 12) {
                shift = 10;
            } else if (shift === 11) {
                shift = 9;
            } else {
                shift -= 3;
            }
        }
        if (shift < 0) shift = 0;
        if (shift > 14) shift = 14;

        console.log(shift)
        setNavigate(shift);
        const navs = document.getElementsByClassName('navigation');
        for (let i = 0; i < navs.length; i++) {
            navs[i].classList.remove('navigation-selected');
        }
        const selected = document.getElementById(getNavigationId(shift));
        if (selected)
            selected.classList.add('navigation-selected')
    }

    function getNavigationId(n: number) {
        return `navigation-${Math.ceil(n / 3)}-${n - (Math.ceil(n / 3) - 1) * 3}`
    }

    function addToPhone(key: number | string) {
        if (phone.length > 9) return;
        dispatch(setPhoneNumber(`${phone}${key}`))
    }

    function removeFromPhone() {
        dispatch(setPhoneNumber(phone.slice(0, -1)))
    }

    useEffect(() => {
        window.addEventListener("keyup", upHandler);
        return () => {
            window.removeEventListener("keyup", upHandler);
        };
    });

    return <div className="second-screen">
        <div className="left bg-blue">
            <div className="wrapper">
                {!phoneValidated && (
                    <PhoneInput
                        addToPhone={addToPhone}
                        removeFromPhone={removeFromPhone}
                        getNavigationId={getNavigationId}
                        validatePhone={validatePhone}
                    />
                )}
                {phoneValidated && <PhoneAccepted/>}
            </div>
        </div>
        <div className="right">
            <Slider/>
            <div className="overlay">
                <div id={getNavigationId(14)}
                     className="navigation"
                     onClick={() => phoneValidated ? dispatch(setPhoneValid(false)) : dispatch(setScreen('first'))}>
                    <img src={closeBtn} alt="Закрыть"/>
                </div>
            </div>

        </div>
    </div>
}
