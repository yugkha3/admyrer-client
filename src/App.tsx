import React, { useState } from 'react';
import axios from 'axios';
import { Form } from '@quillforms/renderer-core';
import '@quillforms/renderer-core/build-style/style.css';
import { registerCoreBlocks } from '@quillforms/react-renderer-utils';
import './App.css';

registerCoreBlocks();

const App = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const handleSubmit = async (data, { completeForm, setIsSubmitting }) => {
    try {
      setIsSubmitting(true);
  
      const requestPayload = {
        brand_introduction: data.answers['kd12edg']?.value,
        deliverables: data.answers['93pda11']?.value,
        social_media_platforms: data.answers['gqr1294c']?.value,
        budget: data.answers['m35612edg']?.value,
        target_audience: data.answers['a213rsew']?.value,
      };
  
      axios
        .post('http://localhost:8000/generate_brief', requestPayload)
        .then(response => {
          setApiResponse(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
  
      setTimeout(() => {
        setIsSubmitting(false);
        completeForm();
        setApiResponse(null); // Clear the API response after form submission
      }, 500);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };
  

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {apiResponse && (
  <div>
    <h3>API Response:</h3>
    <pre>{apiResponse.content}</pre>
  </div>
)}

      <Form
        formId="1"
        formObj={{
          blocks: [
            {
              name: 'welcome-screen',
              id: 'jg1401r',
              attributes: {
                label: 'Admyrer Brief Creator',
                description: 'Create top-notch briefs in less than 30 seconds.',
              },
            },
            {
              name: 'short-text',
              id: 'kd12edg',
              attributes: {
                required: true,
                label: 'Brand Introduction',
                description: 'Provide a brief introduction to your brand:',
              },
            },
            {
              name: 'long-text',
              id: '93pda11',
              attributes: {
                label: 'Deliverables',
                required: true,
                description: 'Specify the deliverables you expect:',
              },
            },
            {
              name: 'multiple-choice',
              id: 'gqr1294c',
              attributes: {
                required: true,
                multiple: true,
                verticalAlign: false,
                label: 'Social Media Platforms',
                description: 'Select the social media platforms you want to target:',
                choices: [
                  {
                    label: 'Instagram',
                    value: 'Instagram',
                  },
                  {
                    label: 'Youtube',
                    value: 'Youtube',
                  },
                  {
                    label: 'Twitter',
                    value: 'Twitter',
                  },
                ],
              },
            },
            {
              name: 'short-text',
              id: 'm35612edg',
              attributes: {
                required: true,
                label: 'Budget',
                description: 'Specify your budget for the project.',
              },
            },
            {
              name: 'long-text',
              id: 'a213rsew',
              attributes: {
                label: 'Target Audience',
                description: 'Describe your target audience for the campaign.',
              },
            },
            {
              name: 'statement',
              id: 'g91imf1023',
              attributes: {
                label: 'You are just one step away from creating the brief.',
                buttonText: 'Continue',
                quotationMarks: true,
              },
            },
          ],
          settings: {
            animationDirection: 'vertical',
            disableWheelSwiping: false,
            disableNavigationArrows: false,
            disableProgressBar: false,
          },
          theme: {
            font: 'Roboto',
            buttonsBgColor: '#9b51e0',
            logo: {
              src: '',
            },
            questionsColor: '#000',
            answersColor: '#0aa7c2',
            buttonsFontColor: '#fff',
            buttonsBorderRadius: 25,
            errorsFontColor: '#fff',
            errorsBgColor: '#f00',
            progressBarFillColor: '#000',
            progressBarBgColor: '#ccc',
          },
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
