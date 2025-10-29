const API_URL = 'https://portfolio-server-8r3q.onrender.com/';

export const sendContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again later.',
    };
  }
};