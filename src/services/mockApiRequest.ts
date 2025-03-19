import type { FormData } from '../types/FormData'

export const mockApiRequest = {
  async submitForm(data: FormData) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulating a random API response:
    // 50% chance of success, 50% chance of failure.
    const success = Math.random() > 0.5
    const message = success
      ? 'Account created successfully!'
      : 'Error sending data. Please try again!'

    return {
      success,
      message,
    }
  },
}
