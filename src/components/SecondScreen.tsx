import {useDispatch, useSelector} from 'react-redux';
import {RootState, setAgreement, setPhoneNumber, setPhoneValid, setScreen} from "../store";
import PhoneInput from "./PhoneInput";
import PhoneAccepted from "./PhoneAccepted";
import React, {RefObject, useEffect, useState} from "react";
import closeBtn from '../static/btn-close.svg'
import {Carousel} from "react-bootstrap";
import prev from "../static/prev.svg";
import next from "../static/next.svg";
import qr from '../static/qr.svg'

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
    const sliderRef: RefObject<any> = React.createRef();

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
    const startTime = useSelector((state: RootState) => {
        return state.startTime
    })

    return <div className="second-screen">
        <div className="left bg-blue">
            <div className="wrapper">
                {startTime}
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
            {phoneValidated && <Carousel className="slider" ref={sliderRef} controls={false}>
                <Carousel.Item>
                    <div id="bg1" className="bg">&nbsp;</div>
                </Carousel.Item>
                <Carousel.Item>
                    <div id="bg2" className="bg">&nbsp;</div>
                </Carousel.Item>
                <Carousel.Item>
                    <div id="bg3" className="bg">&nbsp;</div>
                </Carousel.Item>
            </Carousel>}
            <div className="overlay">
                <div/>
                <div className="container">
                    <div className="row">
                        <div className="col-10 flex align-bottom" style={{
                            color: 'white',
                            textAlign: 'right',
                            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
                        }}>
                            Сканируйте <br/>QR ДЛЯ <br/>ПОЛУЧЕНИЯ <br/>ДОПОЛНИТЕЛЬНОЙ <br/>ИНФОРМАЦИИ
                        </div>
                        <div className="col-2">
                            <img src={qr} alt="qr"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overlay">
                <div>
                    <div
                        onClick={() => phoneValidated ? dispatch(setPhoneValid(false)) : dispatch(setScreen('first'))}
                        id={getNavigationId(14)}
                        className="navigation"
                    >
                        <img
                            src={closeBtn} alt="Закрыть"
                        />
                    </div>

                </div>
                {phoneValidated && <div className="carousel-controls">
                    <img src={prev} alt="prev slide" title="Предыдущий слайд" onClick={() => sliderRef.current.prev()}/>
                    <img src={next} alt="next slide" title="Следующий слайд" onClick={() => sliderRef.current.next()}/>
                </div>}
            </div>

        </div>
    </div>
}
