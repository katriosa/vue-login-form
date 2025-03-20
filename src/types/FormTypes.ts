export interface FormData {
  name: string
  firstname: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export type FormField = {
  name: keyof FormData
  type: string
  placeholder: string
  autocomplete: string
}
