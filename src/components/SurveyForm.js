import React, { useState } from 'react';
import axios from 'axios';

const statesOfIndia = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh"];

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '', gender: '', age: '', address: '', state: '',
    hasChildren: '', childrenCount: '', childrenAge: '', kidsUseTech: '',
    devicesUsed: [], otherDevices: '', screenTime: '',
    usagePurpose: [], otherUsagePurpose: '', troubledByUsage: '',
    usingMeasures: '', measureDetails: '', concerns: [], otherConcerns: '',
    expectations: [], otherExpectations: '',solution: ''
  });

  const [submitted, setSubmitted] = useState(false);

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
    try {
      await axios.post('https://login-bcknd.onrender.com//api/survey/submit', formData);
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
  >
    <div className="flex items-center justify-center min-h-screen p-4">
    <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl">
      {submitted ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Thank you for your feedback!</h2>
          <p className="text-gray-700">We appreciate you helping us build a better product.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-4xl font-extrabold text-purple-800 text-center mb-6 mt-4 drop-shadow">
            Survey Form
          </h2>
          <div>
            <label className="block text-lg font-semibold mb-1">Full Name:</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" required />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">Gender:</label>
            <div className="space-y-1">
              <label className="block"><input type="radio" name="gender" value="male" onChange={handleChange} required /> Male</label>
              <label className="block"><input type="radio" name="gender" value="female" onChange={handleChange} /> Female</label>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" required />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">Address:</label>
            <textarea name="address" value={formData.address} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" required />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">State:</label>
            <select name="state" value={formData.state} onChange={handleChange} className="ww-full border-2 border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" required>
              <option value="">Select State</option>
              {statesOfIndia.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">Do you have children?</label>
            <div className="space-y-1">
              <label className="block"><input type="radio" name="hasChildren" value="yes" onChange={handleChange} /> Yes</label>
              <label className="block"><input type="radio" name="hasChildren" value="no" onChange={handleChange} /> No</label>
            </div>
          </div>

          {formData.hasChildren === 'yes' && (
            <>
              <div>
                <label className="block text-lg font-semibold mb-1">How many children do you have?</label>
                <input type="number" name="childrenCount" value={formData.childrenCount} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-1">What is the average age of your children:</label>
                <input type="number" name="childrenAge" value={formData.childrenAge} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-1">Do your children use technological devices?</label>
                <div className="space-y-1">
                  <label className="block"><input type="radio" name="kidsUseTech" value="yes" onChange={handleChange} /> Yes/Sometimes</label>
                  <label className="block"><input type="radio" name="kidsUseTech" value="no" onChange={handleChange} /> No</label>
                </div>
              </div>

              {formData.kidsUseTech === 'yes' && (
                <>
                  <div>
                    <label className="block text-lg font-semibold mb-1">What are the devices used by your children?</label>
                    <div className="space-y-1">
                      {['Television', 'Laptop', 'Smart Phone', 'Tablet'].map(device => (
                        <label key={device} className="block"><input type="checkbox" name="devicesUsed" value={device} onChange={handleChange} /> {device}</label>
                      ))}
                    </div>
                    <input type="text" name="otherDevices" placeholder="Other Devices" value={formData.otherDevices} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-1">What is the average screen time (hrs/day) of your children?</label>
                    <input type="number" name="screenTime" value={formData.screenTime} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-1">What are the purposes that your children use devices for?</label>
                    <div className="space-y-1">
                      {['Studies', 'Entertainment', 'Social Media'].map(purpose => (
                        <label key={purpose} className="block"><input type="checkbox" name="usagePurpose" value={purpose} onChange={handleChange} /> {purpose}</label>
                      ))}
                    </div>
                    <input type="text" name="otherUsagePurpose" placeholder="Other purpose" value={formData.otherUsagePurpose} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-1">Are you troubled by your child's use of technological devices?</label>
                    <div className="space-y-1">
                      <label className="block"><input type="radio" name="troubledByUsage" value="yes" onChange={handleChange} /> Yes</label>
                      <label className="block"><input type="radio" name="troubledByUsage" value="no" onChange={handleChange} /> No</label>
                    </div>
                  </div>

                  {formData.troubledByUsage === 'yes' && (
                    <>
                      <div>
                        <label className="block text-lg font-semibold mb-1">Are you using any measures to control it?</label>
                        <div className="space-y-1">
                          <label className="block"><input type="radio" name="usingMeasures" value="yes" onChange={handleChange} /> Yes</label>
                          <label className="block"><input type="radio" name="usingMeasures" value="no" onChange={handleChange} /> No</label>
                        </div>
                      </div>

                      {formData.usingMeasures === 'yes' && (
                        <div>
                          <label className="block text-lg font-semibold mb-1">Please specify the measures:</label>
                          <input type="text" name="measureDetails" value={formData.measureDetails} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                        </div>
                      )}

                      <div>
                        <label className="block text-lg font-semibold mb-1">What are your major concerns?</label>
                        <div className="space-y-1">
                          {['Violent content', 'Eye strain', 'Behavioral changes after exposure'].map(c => (
                            <label key={c} className="block"><input type="checkbox" name="concerns" value={c} onChange={handleChange} /> {c}</label>
                          ))}
                        </div>
                        <input type="text" name="otherConcerns" placeholder="Other concerns" value={formData.otherConcerns} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                      </div>
                      <div>
                        <label className="block text-lg font-semibold mb-1">What’s your solution for the same?</label>
                               <textarea
                                name="solution"
                                value={formData.solution}
                                onChange={handleChange}
                                className="w-full border p-2 rounded-lg"
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
            <label className="block text-lg font-semibold mb-1">What are your expectations from Palanam Technologies?</label>
            <div className="space-y-1">
              {['Regular Reporting', 'Blocking of age restricted content', 'Reducing screen-time'].map(e => (
                <label key={e} className="block"><input type="checkbox" name="expectations" value={e} onChange={handleChange} /> {e}</label>
              ))}
            </div>
            <input type="text" name="otherExpectations" placeholder="Other expectations" value={formData.otherExpectations} onChange={handleChange} className="w-full border-2 border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
          </div>

          <div className="flex justify-center pt-6">
            <button type="submit" className="bg-blue-400 text-white px-20 py-6 rounded-lg hover:bg-blue-600">Submit</button>
          </div>
        </form>
      )}
  
    </div> 
    </div>
  </div>   
);     
};
export default SurveyForm;
