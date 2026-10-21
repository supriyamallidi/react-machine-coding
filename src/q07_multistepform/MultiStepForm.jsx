import React, { useState } from "react";

function MultiStepForm() {

    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        street: '',
        city: '',
        zip: ''
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
        if(errors[name]) setErrors(prev => ({...prev, [name]: ''}))
    }

    const validateStep = () => {
        const newErrors = {}
        if(step === 1){
            if(!formData.name.trim()) newErrors.name = 'Name is Required'
            if(!formData.email.includes('@')) newErrors.email = 'Valid email required'
            if(formData.password.length<6) newErrors.password = 'Min 6 Characters needed'
        }
        if(step === 2){
            if(!formData.street.trim()) newErrors.street = 'Street is Required'
            if(!formData.city.trim()) newErrors.city = 'City is Required'
            if(!formData.zip.trim()) newErrors.zip = 'Zip is Required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;

    }

    const handleBack = () => {
        setStep(prev => prev-1)
    }

    const handleNext = () => {
        if(validateStep()) setStep(prev => prev+1)
    }

    const handleSubmit = () => {
        alert('Form Submitted Successfully' + JSON.stringify(formData, null, 2))
    }


    const Field = ({name, label, type='text'}) => (
        <div>
            <label>{label}</label>
            <input type={type} name={name} value={formData[name]} onChange={handleChange} />
            {errors[name] && <span style={{color: 'red'}}>{errors[name]}</span>}
        </div>
    )

    return (
        <div>
            <p>Step {step} of 3</p>
            {
                step === 1 && (
                    <div>
                        <h2>Personal Info</h2>
                        <Field name="name" label="Full Name"/>
                        <Field name="email" label="Email" type="email"/>
                        <Field name="password" label="Password" type="password"/>
                    </div>
                )
            }
            {
                step === 2 && (
                    <div>
                        <h2>Address</h2>
                        <Field name="street" label="Street"/>
                        <Field name="city" label="City"/>
                        <Field name="zip" label="Zip Code"/>
                    </div>
                )
            }
            {
                step === 3 && (
                    <div>
                        <h2>Review and Submit</h2>
                        <p>Name: {formData.name}</p>
                        <p>Email: {formData.email}</p>
                        <p>Address: {formData.street}, {formData.city} {formData.zip}</p>
                    </div>
                )
            }
            <div>
                {step > 1 && (<button onClick={handleBack}>Back</button>)}
                {step < 3 ? (<button onClick={handleNext}>Next</button>) : (<button onClick={handleSubmit}>Submit</button>)}
            </div>
        </div>
    )
}

export default MultiStepForm