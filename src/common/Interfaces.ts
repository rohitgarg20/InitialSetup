export interface I_TEXT_FIELD{
  label: string
  inputValue: string
  key: string
  isPasswordField?: boolean
  errorMessage: string

}

export interface ISubCategoryList {
  subCategoryId: string
  subCategoryName: string
}

export interface ICategoryList {
  categoryId: string
  categoryName: string
  subCategoriesList: ISubCategoryList[]
}

export interface ISelectedCategoryData {
  categoryName: string
  categoryId: string
  subCategoryName: string
  subCategoryId: string
}

export interface IHomeCategoryData {
  displayLabel: string
  key: string
  icon: string
}

export interface IComplainData {
  complaintId: string
  complaintTitle: string
  status: string
  statusDisplayData: {
    value: string
    backgroundColor: string
  }
  priority: string
  complaintLevel: string
  complaintAddress: string
  _id: string
  complaintType: string
  displayComplaintType: string
  complainerRole: string
  updatedAt: Date
  createdAt: Date
  complainer: {
    name: string
  }
  category: {
    _id: string
    categoryName: string
  }
  subcomplaintCategory: {
    _id: string
    subcategoryName: string
  }
  complaintUserData: {
    displayLabel: string
    displayValue: string
  }
  vendorData?: {
    displayLabel: string
    displayValue: string
  }
  displayComplaintCategory: string
}

export interface IDataList{
  key: string
  displayValue: string
  isSelected: boolean
}