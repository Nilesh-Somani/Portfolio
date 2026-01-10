const API_URL = import.meta.env.VITE_API_URL || '/';

export const sendContactForm = async (data) => {
  try {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      mode: "no-cors", // important
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
