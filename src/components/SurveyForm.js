import React, { useState } from 'react';
import axios from 'axios';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    gender: '',
    age: '',
    state: '',
    hasChildren: '',
    childrenCount: '',
    childrenAge: '',
    kidsUseTech: '',
    screenTime: '',
    troubledByUsage: '',
    techServiceUsage: '',
    techService: '',
    serviceLack: '',
    palanamExpectation: '',
    expectedServices: '',
    troubledByOwnUsage: '',
    issuesFaced: '',
    kidsUseTechPurposes: [],
    otherPurpose: '',
    majorConcerns: [],
    otherConcern: '',
    palanamExpectations: [],
    additionalRequirements: '',
    devicesUsed: [],
    otherDevice: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const statesOfIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const updatedPurposes = checked
        ? [...formData.kidsUseTechPurposes, value]
        : formData.kidsUseTechPurposes.filter((purpose) => purpose !== value);
      setFormData({ ...formData, kidsUseTechPurposes: updatedPurposes });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
  
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        [name]: [...prev[name], value]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: prev[name].filter((item) => item !== value)
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/survey/submit', formData);
      if (response.status === 201) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Submission error:', err.response?.data || err.message);
      alert('Failed to submit survey');
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-6 bg-green-100 rounded-lg shadow-md text-center ">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Thank you for your feedback!</h2>
        <p className="text-gray-700">We appreciate you helping us build a better product.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-4 center mt-20">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold" htmlFor="fullName">
          Full Name:
        </label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Enter your full name"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={handleChange}
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-semibold" htmlFor="address">
          Address (Optional):
        </label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Your address (optional)"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={handleChange}
        />
      </div>

      {/* State */}
      <div>
        <label className="block text-sm font-semibold" htmlFor="state">
          State:
        </label>
        <select
          name="state"
          id="state"
          required
          className="w-full px-4 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={handleChange}
        >
          <option value="">Select your state</option>
          {statesOfIndia.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      {/* Gender */}
<div>
  <p className="font-semibold mb-2">Gender</p>
  <label className="block">
    <input
      type="radio"
      name="gender"
      value="Male"
      onChange={handleChange}
      required
    />
    <span className="ml-2">Male</span>
  </label>
  <label className="block">
    <input
      type="radio"
      name="gender"
      value="Female"
      onChange={handleChange}
    />
    <span className="ml-2">Female</span>
  </label>
  <label className="block">
    <input
      type="radio"
      name="gender"
      value="Others"
      onChange={handleChange}
    />
    <span className="ml-2">Others</span>
  </label>
</div>

{/* Age */}
<input
  type="number"
  name="age"
  placeholder="Your Age"
  required
  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400 mt-4"
  onChange={handleChange}
/>


      {/* Do you have children? */}
      <div>
        <p className="font-semibold mb-2">Do you have children?</p>
        <label className="block">
          <input type="radio" name="hasChildren" value="yes" onChange={handleChange} required />
          <span className="ml-2">Yes</span>
        </label>
        <label className="block">
          <input type="radio" name="hasChildren" value="no" onChange={handleChange} required />
          <span className="ml-2">No</span>
        </label>
      </div>

      {/* Children details */}
      {formData.hasChildren === 'yes' && (
        <>
          <div>
            <label className="block text-sm font-semibold" htmlFor="childrenCount">
              How many children do you have?
            </label>
            <input
              type="number"
              name="childrenCount"
              id="childrenCount"
              placeholder="Enter the number of children"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold" htmlFor="childrenAge">
              Average age of your children:
            </label>
            <input
              type="number"
              name="childrenAge"
              id="childrenAge"
              placeholder="Enter the average age"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {/* Do your kids use technological devices? */}
      {formData.hasChildren === 'yes' && (
        <>
          <div>
            <label className="block text-sm font-semibold">
              Do your kids use technological devices?
            </label>
            <label className="block">
              <input
                type="radio"
                name="kidsUseTech"
                value="yes"
                onChange={handleChange}
                required
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="block">
              <input
                type="radio"
                name="kidsUseTech"
                value="no"
                onChange={handleChange}
                required
              />
              <span className="ml-2">No</span>
            </label>
          </div>

          {/* What devices does your child use? */}
          {formData.kidsUseTech === 'yes' && (
<div>
  <p className="font-semibold mb-2">What device(s) does your child use?</p>
  <label className="block">
    <input
      type="checkbox"
      name="devicesUsed"
      value="Laptop"
      onChange={handleCheckboxChange}
    />
    <span className="ml-2">Laptop</span>
  </label>
  <label className="block">
    <input
      type="checkbox"
      name="devicesUsed"
      value="Mobile Phone"
      onChange={handleCheckboxChange}
    />
    <span className="ml-2">Mobile Phone</span>
  </label>
  <label className="block">
    <input
      type="checkbox"
      name="devicesUsed"
      value="Tablet"
      onChange={handleCheckboxChange}
    />
    <span className="ml-2">Tablet</span>
  </label>
  <label className="block">
    <input
      type="checkbox"
      name="devicesUsed"
      value="Other"
      onChange={handleCheckboxChange}
    />
    <span className="ml-2">Other</span>
  </label>

  {/* If Other is selected, show text input */}
  {formData.devicesUsed.includes('Other') && (
    <input
      type="text"
      name="otherDevice"
      placeholder="Please specify other device(s)"
      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400 mt-2"
      onChange={handleChange}
    />
  )}
</div>
)}
          {/* Average screen time */}
          {formData.kidsUseTech === 'yes' && (
            <div>
              <label className="block text-sm font-semibold" htmlFor="screenTime">
                What is the average screen time of your children?
              </label>
              <input
                type="number"
                name="screenTime"
                id="screenTime"
                placeholder="Enter the average screen time in hours"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={handleChange}
              />
            </div>
          )}

          {/* Purposes for using devices */}
          {formData.kidsUseTech === 'yes' && (
            <div>
              <p className="font-semibold mb-2">What purposes do your kids use technological devices for?</p>
              <label className="block">
                <input
                  type="checkbox"
                  name="kidsUseTechPurposes"
                  value="Educational"
                  onChange={handleChange}
                />
                <span className="ml-2">Educational</span>
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  name="kidsUseTechPurposes"
                  value="Entertainment"
                  onChange={handleChange}
                />
                <span className="ml-2">Entertainment</span>
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  name="kidsUseTechPurposes"
                  value="Social Media"
                  onChange={handleChange}
                />
                <span className="ml-2">Social Media</span>
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  name="kidsUseTechPurposes"
                  value="Other"
                  onChange={handleChange}
                />
                <span className="ml-2">Other (please specify):</span>
              </label>
              {formData.kidsUseTechPurposes.includes('Other') && (
                <input
                  type="text"
                  name="otherPurpose"
                  placeholder="Specify other purposes"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onChange={handleChange}
                />
              )}
            </div>
          )}
        </>
      )}

      {/* Troubled by usage */}
<div>
  <p className="font-semibold mb-2">Are you troubled by your kid's high usage of phones and laptops?</p>
  <label className="block">
    <input type="radio" name="troubledByUsage" value="yes" onChange={handleChange} required />
    <span className="ml-2">Yes</span>
  </label>
  <label className="block">
    <input type="radio" name="troubledByUsage" value="no" onChange={handleChange} required />
    <span className="ml-2">No</span>
  </label>
</div>

{/* If troubled by usage, show concerns */}
{formData.troubledByUsage === 'yes' && (
  <>
    {/* Major Concerns */}
    <div>
      <p className="font-semibold mb-2">What is a major concern?</p>
      <label className="block">
        <input type="checkbox" name="majorConcerns" value="Exposure to adult content" onChange={handleCheckboxChange} />
        <span className="ml-2">Exposure to adult content</span>
      </label>
      <label className="block">
        <input type="checkbox" name="majorConcerns" value="Privacy concerns" onChange={handleCheckboxChange} />
        <span className="ml-2">Privacy concerns</span>
      </label>
      <label className="block">
        <input type="checkbox" name="majorConcerns" value="Violent content" onChange={handleCheckboxChange} />
        <span className="ml-2">Violent content</span>
      </label>
      <label className="block">
        <input type="checkbox" name="majorConcerns" value="Other" onChange={handleCheckboxChange} />
        <span className="ml-2">Other</span>
      </label>
      {formData.majorConcerns.includes("Other") && (
        <input
          type="text"
          name="otherConcern"
          placeholder="Please specify other concerns"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
          onChange={handleChange}
        />
      )}
    </div>

    {/* Updated Palanam Expectations */}
    <div>
      <p className="font-semibold mb-2 mt-4">What are some key expectations from Palanam Technologies?</p>
      <label className="block">
        <input type="checkbox" name="palanamExpectations" value="Detailed reports" onChange={handleCheckboxChange} />
        <span className="ml-2">Detailed reports</span>
      </label>
      <label className="block">
        <input type="checkbox" name="palanamExpectations" value="Continuous surveillance on child's web surfing" onChange={handleCheckboxChange} />
        <span className="ml-2">Continuous surveillance on child's web surfing</span>
      </label>
      <label className="block">
        <input type="checkbox" name="palanamExpectations" value="Blocking of adult content" onChange={handleCheckboxChange} />
        <span className="ml-2">Blocking of adult content</span>
      </label>
    </div>

    {/* Additional Requirements */}
    <textarea
      name="additionalRequirements"
      placeholder="If there are other requirements, please specify."
      rows="3"
      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
      onChange={handleChange}
    />
  </>
)}


      <button
        type="submit"
        className="bg-blue-300 hover:bg-blue-400 text-white font-semibold w-full py-2 rounded"
      >
        Submit Survey
      </button>
    </form>
  );
};

export default SurveyForm;
