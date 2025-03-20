import type { FormData } from '../types/FormTypes'

export const useFormValidation = (data: FormData) => {
  const errors: { [key: string]: string } = {}

  const MIN_NAME_LENGTH = 3
  const MIN_PASSWORD_LENGTH = 6
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const PHONE_REGEX = /^\+?\d+$/

  if (data.name.length < MIN_NAME_LENGTH) {
    errors.name = `Must be at least ${MIN_NAME_LENGTH} characters`
  }
  if (data.firstname.length < MIN_NAME_LENGTH) {
    errors.firstname = `Must be at least ${MIN_NAME_LENGTH} characters`
  }
  if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Invalid format email'
  }
  if (!PHONE_REGEX.test(data.phone)) {
    errors.phone = 'Invalid format phone'
  }
  if (data.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Must be at least ${MIN_PASSWORD_LENGTH} characters`
  }
  if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Passwords don't match"
  }
  if (Object.keys(errors).length > 0) {
    return errors
  }
  return null
}
