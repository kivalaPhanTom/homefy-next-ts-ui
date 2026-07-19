'use client'
import { all } from 'redux-saga/effects'
import { loginSagaList } from './LoginSagas'
// import { emergencyContactSagaList } from './EmergencyContactSaga'
// import { addressHistorySagaList } from './AddressHistorySaga'
// import { aboutMeSagaList } from './AboutMeSaga'
// import { personalDetailSagaList } from './PersonalDetailSaga'
// import { employmentSagaList } from './EmploymentSaga'
// import { inComeSagaList } from './InComeSaga'
// import { identifyDocumentSagaList } from './IdentifyDocumentSaga'
// import { householdSagaList } from './HouseholdSaga.ts'
// import { productSagaList } from './ProductSaga.ts'
import { homeSagaList } from './HomeSaga'
import { signupSagaList } from './SignupSaga'
import { tokenSagaList } from './TokenSaga'
import { UserSagaList } from './UserSaga'
import { listingManagementSagaList } from './ListingManagementSaga'
import { filterProductPageSagaList } from './FilterProductPageSaga'
// import { applicationSagaList } from './ApplicationSaga.ts'
import { favouriteProductPageSagaList } from './FavouriteProductSaga'
import {forgotPasswordSagaList} from './ForgotPasswordSaga'
import { bookingSagaList } from './BookingSaga'
import { paymentSagaList } from './PaymentSaga'

const sagasList = [
  loginSagaList(),
  // emergencyContactSagaList(),
  // addressHistorySagaList(),
  // aboutMeSagaList(),
  // personalDetailSagaList(),
  // employmentSagaList(),
  // inComeSagaList(),
  // identifyDocumentSagaList(),
  // householdSagaList(),
  // productSagaList(),
  homeSagaList(),
  signupSagaList(),
  tokenSagaList(),
  UserSagaList(),
  listingManagementSagaList(),
  filterProductPageSagaList(),
  // applicationSagaList(),
  favouriteProductPageSagaList(),
  forgotPasswordSagaList(),
  bookingSagaList(),
  paymentSagaList()
]

export default function* () {
  yield all(sagasList)
}
