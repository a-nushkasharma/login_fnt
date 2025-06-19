import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Country, State } from 'country-state-city';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '', gender: '', age: '', address: '', country: '', state: '',
    hasChildren: '', childrenCount: '', childrenAge: '', kidsUseTech: '',
    devicesUsed: [], otherDevices: '', screenTime: '',
    usagePurpose: [], otherUsagePurpose: '', troubledByUsage: '',
    usingMeasures: '', measureDetails: '', concerns: [], otherConcerns: '',
    expectations: [], otherExpectations: '', solution: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.country) {
      const states = State.getStatesOfCountry(formData.country);
      setStateOptions(states);
    } else {
      setStateOptions([]);
    }
  }, [formData.country]);

// for redirection after survey is submitted
   useEffect(() => {
    const alreadySubmitted = localStorage.getItem('surveySubmitted');
    if (alreadySubmitted === 'true') {
      navigate('/'); // Or wherever your LoginModal is triggered
    }
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedArray = checked
        ? [...formData[name], value]
        : formData[name].filter(v => v !== value);
      setFormData({ ...formData, [name]: updatedArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (formData.kidsUseTech === 'yes' && formData.devicesUsed.length === 0) {
    alert("Please select at least one device used!");
    return;
  }

    if (formData.troubledByUsage === 'yes' && formData.concerns.length === 0) {
    alert("Please select at least one major concern!");
    return;
    }

    if (formData.expectations.length ===0) {
    alert("Please select at least one expectation!");
    return;
  }
    try {
      await axios.post('https://login-bcknd.onrender.com/api/survey/submit', formData);
      localStorage.setItem('surveySubmitted', 'true');
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert('Error submitting form');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat overflow-auto"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/image7.png"})` }}
      //we can change the image by placing the image in the public folder
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl">
        {/* Message post submission */}
          {submitted ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Thank you for your feedback!</h2>
              <p className="text-gray-700">We appreciate you helping us build a better product.</p>
            </div>
          ) : (
            // Survey Form starts from here onwards
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-5xl font-extrabold text-purple-800 text-center mb-6 mt-6 drop-shadow">
                Survey Form
              </h2>
              <div>
                <label className="block text-2xl font-semibold mb-1">Full Name:</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300" required />
              </div>

              <div>
                <label className="block text-2xl font-semibold mb-1">Gender:</label>
                <div className="space-y-1">
                  <label className="block text-xl "><input type="radio" name="gender" value="male" onChange={handleChange} required /> Male</label>
                  <label className="block text-xl "><input type="radio" name="gender" value="female" onChange={handleChange} /> Female</label>
                </div>
              </div>

              <div>
                <label className="block text-2xl font-semibold mb-1">Age:</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300" required />
              </div>

              <div>
                <label className="block text-2xl font-semibold mb-1">Address:</label>
                <textarea name="address" value={formData.address} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300" required />
              </div>

              <div>
                <label className="block text-2xl font-semibold mb-1">Country:</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border-2 border-purple-200 p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300"
                  required
                >
                  <option value="">Select Country</option>
                  {Country.getAllCountries().map(c => (
                    <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-2xl font-semibold mb-1">State:</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border-2 border-purple-200 p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300"
                  required
                >
                  <option value="">Select State</option>
                  {stateOptions.map(state => (
                    <option key={state.isoCode} value={state.name}>{state.name}</option>
                  ))}
                </select>
              </div>

          <div>
            <label className="block text-2xl font-semibold mb-1">Do you have children?</label>
            <div className="space-y-1">
              <label className="block text-xl "><input type="radio" name="hasChildren" value="yes" onChange={handleChange} required /> Yes</label>
              <label className="block text-xl "><input type="radio" name="hasChildren" value="no" onChange={handleChange} /> No</label>
            </div>
          </div>

          {formData.hasChildren === 'yes' && (
            <>
              <div>
                <label className="block text-2xl font-semibold mb-1">How many children do you have?</label>
                <input type="number" name="childrenCount" value={formData.childrenCount} onChange={handleChange}  required={formData.hasChildren === 'yes'} className="w-full border-2 border-purple-200 p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300" />
              </div>

              <div>
                <label className="block text-2xl font-semibold mb-1">What is the average age of your children:</label>
                <input type="number" name="childrenAge" value={formData.childrenAge} onChange={handleChange}  required={formData.hasChildren === 'yes'} className="w-full border-2 border-purple-200 p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300" />
              </div>

              <div>
                <label className="block text-2xl font-semibold mb-1">Do your children use technological devices?</label>
                <div className="space-y-1">
                  <label className="block text-xl "><input type="radio" name="kidsUseTech" value="yes" onChange={handleChange}  required={formData.hasChildren === 'yes'}/> Yes/Sometimes</label>
                  <label className="block text-xl "><input type="radio" name="kidsUseTech" value="no" onChange={handleChange} /> No</label>
                </div>
              </div>

              {formData.kidsUseTech === 'yes' && (
                <>
                  <div>
                    <label className="block text-2xl font-semibold mb-1">What are the devices used by your children?</label>
                    <div className="space-y-1">
                      {/* Relevant questions with checkbox are made required by adding alert in handleSubmit function */}
                      {['Television', 'Laptop', 'Smart Phone', 'Tablet'].map(device => (
                        <label key={device} className="block text-xl"><input type="checkbox" name="devicesUsed" value={device} onChange={handleChange} /> {device}</label>
                      ))}
                    </div>
                    <input type="text" name="otherDevices" placeholder="Other Devices" value={formData.otherDevices} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300" />
                  </div>

                  <div>
                    <label className="block text-2xl font-semibold mb-1">What is the average screen time (hrs/day) of your children?</label>
                    <input type="number" name="screenTime" value={formData.screenTime} onChange={handleChange} required={formData.kidsUseTech === 'yes'}className="w-full border-2 border-purple-200 p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300" />
                  </div>

                  <div>
                    <label className="block text-2xl font-semibold mb-1">What are the purposes that your children use devices for?</label>
                    <div className="space-y-1">
                      {['Studies', 'Entertainment', 'Social Media'].map(purpose => (
                        <label key={purpose} className="block text-xl"><input type="checkbox" name="usagePurpose" value={purpose} onChange={handleChange} /> {purpose}</label>
                      ))}
                    </div>
                    <input type="text" name="otherUsagePurpose" placeholder="Other purpose" value={formData.otherUsagePurpose} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300" />
                  </div>

                  <div>
                    <label className="block text-2xl font-semibold mb-1">Are you troubled by your child's use of technological devices?</label>
                    <div className="space-y-1">
                      <label className="block text-xl "><input type="radio" name="troubledByUsage" value="yes" onChange={handleChange} required={formData.kidsUseTech === 'yes'}/> Yes</label>
                      <label className="block text-xl "><input type="radio" name="troubledByUsage" value="no" onChange={handleChange} /> No</label>
                    </div>
                  </div>

                  {formData.troubledByUsage === 'yes' && (
                    <>
                      <div>
                        <label className="block text-2xl font-semibold mb-1">Are you using any measures to control it?</label>
                        <div className="space-y-1">
                          <label className="block text-xl "><input type="radio" name="usingMeasures" value="yes" onChange={handleChange} /> Yes</label>
                          <label className="block text-xl "><input type="radio" name="usingMeasures" value="no" onChange={handleChange} /> No</label>
                        </div>
                      </div>

                      {formData.usingMeasures === 'yes' && (
                        <div>
                          <label className="block text-2xl font-semibold mb-1">Please specify the measures:</label>
                          <input type="text" name="measureDetails" value={formData.measureDetails} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300" />
                        </div>
                      )}

                      <div>
                        <label className="block text-2xl font-semibold mb-1">What are your major concerns?</label>
                        <div className="space-y-1">
                          {['Violent content', 'Eye strain', 'Behavioral changes after exposure'].map(c => (
                            <label key={c} className="block text-xl"><input type="checkbox" name="concerns" value={c} onChange={handleChange}/> {c}</label>
                          ))}
                        </div>
                        <input type="text" name="otherConcerns" placeholder="Other concerns" value={formData.otherConcerns} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300" />
                      </div>
                      <div>
                        <label className="block text-2xl font-semibold mb-1">What’s your solution for the same?</label>
                               <textarea
                                name="solution"
                                value={formData.solution}
                                onChange={handleChange}
                                className="w-full border p-2 rounded-2xl"
                                placeholder="Your suggested solution..."
                                />
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}

          <div>
            <label className="block text-2xl font-semibold mb-1">What are your expectations from Palanam Technologies?</label>
            <div className="space-y-1">
              {['Regular Reporting', 'Blocking of age restricted content', 'Reducing screen-time'].map(e => (
                <label key={e} className="block text-xl"><input type="checkbox" name="expectations" value={e} onChange={handleChange} /> {e}</label>
              ))}
            </div>
            <input type="text" name="otherExpectations" placeholder="Other expectations" value={formData.otherExpectations} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300" />
          </div>

          <div className="flex justify-center pt-6">
            <button type="submit" className="bg-purple-400 text-white px-10 py-6 rounded-2xl hover:bg-purple-600 text-xl">Submit</button>
          </div>
        </form>
      )}
  
    </div> 
    </div>
  </div>   
);     
};
export default SurveyForm;
