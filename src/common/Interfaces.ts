export interface I_TEXT_FIELD{
  label: string
  inputValue: string
  key: string
  isPasswordField?: boolean
  errorMessage: string

}

export interface I_REVIEWS_ITEM{
  heading: string
  profileImage: string
  content: string
  userName: string
  userType: string
  grade: string
}