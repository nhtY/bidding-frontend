
import React, {useState} from "react";
import UserInfoForm from "./UserInfoForm";
import AddressInfoForm from "./AddressInfoForm";
import PaymentInfoForm from "./PaymentInfoForm";
import ConfirmRegister from "./ConfirmRegister";
import authService from "../service/authService"

function RegisterFrom() {
    const initialData = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        passwordRepeat: '',
        deliveryAddress: {
            houseNumber: '',
            street: '',
            city: '',
            postalCode: '',
            country: ''
        },
        paymentInfo: {
            ccNumber: '',
            ccExpiration: '',
            ccCVV: ''
        }
    }

    const formNames = ['personal', 'address', 'payment']

    const initialValid = {personal: false, address: false, payment: false}

    const [currentStep, setStep] = useState(1);
    const [isShow, setShow] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isValid, setValid] = useState(initialValid);
    const [data, setData] = useState(initialData);

    function handleValid(formName) {
        console.log("handle valid is working..");
        setValid({...isValid, [formName]: true});
        //handleNext();
    }

    // When 'Next' is clicked, check if inputs are valid. If valid go next form
    const handleChange = (e) => {
        if (formNames[currentStep-1] === 'address'){
            const address = { ...data.deliveryAddress, [e.target.name]: e.target.value }
            setData({ ...data, ['deliveryAddress']: address });
        }else if (formNames[currentStep-1] === 'payment') {
            const address = { ...data.paymentInfo, [e.target.name]: e.target.value }
            setData({ ...data, ['paymentInfo']: address });
        }else {
            setData({ ...data, [e.target.name]: e.target.value });
        }

    };

    function handleNext(currentForm) {
        setStep(currentStep + 1);
        // handleValid(currentForm);
        // console.log("handle next is working for ", formNames[currentStep-1])
        // console.log(isValid[formNames[currentStep-1]]);
        // if (isValid[formNames[currentStep-1]]){
        //     setStep(currentStep + 1);
        //     console.log(currentStep);
        // }
    }

    function handlePrevious() {
        setStep(currentStep - 1);
    }

    function registerUser() {
        console.log("registering user with data: ", data);
        authService.register(data)
            .then(response => {
                setModalMessage("Registration successful!");
                setShow(true);
            })
            .catch(error => {
                console.log(error.message)
                setModalMessage(error.message);
                setShow(true);
            });

    }
    const handleCloseModal = () => {
        setModalMessage("");
        setShow(false);
    };


    switch (currentStep) {
        case 1:
            return <UserInfoForm currentStep={currentStep} data={data} handleChange={handleChange}
                                 handleValid={handleValid} handleNext={handleNext} />;
        case 2:
            return <AddressInfoForm currentStep={currentStep} data={data} handleChange={handleChange}
                                    handleValid={handleValid} handlePrev={handlePrevious} handleNext={handleNext} />;
        case 3:
            return <PaymentInfoForm currentStep={currentStep} data={data} handleChange={handleChange}
                                    handleValid={handleValid} handlePrev={handlePrevious} handleNext={handleNext} />;
        case 4:
            return <ConfirmRegister currentStep={currentStep} data={data} handlePrev={handlePrevious}
                                    handleRegister={registerUser} isShow={isShow} modalMessage={modalMessage}
                                    handleCloseModal={handleCloseModal}
            />;
        default:
            return <h1>No Step here</h1>;
    }
}

export default RegisterFrom;