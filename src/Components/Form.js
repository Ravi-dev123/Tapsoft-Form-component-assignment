import React, { useState, useEffect } from 'react';
import '../Components/Form.css'

const Form = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phonenumber: '',
        gender:''
    });

    const [errors, setErrors] = useState({});
    const [issubmit, setIsSubmit] = useState(false)


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(formData))
        setIsSubmit(true)
    };
    useEffect(() => {
        if (Object.keys(errors).length === 0 && issubmit) {
            console.log(formData)
        }
    }, [errors, formData, issubmit])
    const validate = (values) => {
        const newErrors = {};
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        if (!(values.email)) {
            newErrors.email = 'Email Is Required';
        } else if (!emailRegex.test(values.email)) {
            newErrors.email = 'This Is Not Valid Email Format'
        }

        if (!values.password) {
            newErrors.password = 'Password is required';
        } else if (values.password.length < 8) {
            newErrors.password = 'Password Must Be of minimun 8 Characters'
        }

        if (!values.phonenumber) {
            newErrors.phonenumber = 'phone number is required'
        } else if (values.phonenumber.length < 10) {
            newErrors.phonenumber = 'phonenumber must contain 10 numbers'
        }
        if (!values.gender) {
            newErrors.gender = 'Gender is required';
        }
        return newErrors;
    }

    return (
        <div>
            <div className='success-msg'>
                {Object.keys(errors).length === 0 && issubmit ? (<h3>Signed IN Succesfully</h3>) : <h3>{null}</h3>}
            </div>
            <div className="form-container">
                <h1>Login Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            placeholder='Email ex.xxx@gmai.com'
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            placeholder='Enter at least 8 characters'
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    <div className="form-group">
                        <label>Phone No.:</label>
                        <input
                            placeholder='Enter Valid No'
                            type="text"
                            name="phonenumber"
                            value={formData.phonenumber}
                            onChange={handleInputChange}
                        />
                        {errors.phonenumber && <p className="error">{errors.phonenumber}</p>}
                    </div>
                    <div className="form-group">
                        <label>Gender:</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="error">{errors.gender}</p>}
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Form;
