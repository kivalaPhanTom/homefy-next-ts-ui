'use client'
import { all } from 'redux-saga/effects'
import { loginSagaList } from './LoginSagas'
import { emergencyContactSagaList } from './EmergencyContactSaga'
import { addressHistorySagaList } from './AddressHistorySaga'
import { aboutMeSagaList } from './AboutMeSaga'
import { personalDetailSagaList } from './PersonalDetailSaga'
import { employmentSagaList } from './EmploymentSaga'
import { inComeSagaList } from './InComeSaga'
import { identifyDocumentSagaList } from './IdentifyDocumentSaga'
import { householdSagaList } from './HouseholdSaga.ts'
// import { productSagaList } from './ProductSaga.ts'
import { homeSagaList } from './HomeSaga.ts'
import { signupSagaList } from './SignupSaga.ts'
import { tokenSagaList } from './TokenSaga.ts'
import { UserSagaList } from './UserSaga.ts'
import { listingManagementSagaList } from './ListingManagementSaga.ts'
import { filterProductPageSagaList } from './FilterProductPageSaga.ts'
import { applicationSagaList } from './ApplicationSaga.ts'
import { favouriteProductPageSagaList } from './FavouriteProductSaga.ts'
import {forgotPasswordSagaList} from './ForgotPasswordSaga.ts'
import { bookingSagaList } from './BookingSaga'
import { paymentSagaList } from './PaymentSaga.ts'

const sagasList = [
  loginSagaList(),
  emergencyContactSagaList(),
  addressHistorySagaList(),
  aboutMeSagaList(),
  personalDetailSagaList(),
  employmentSagaList(),
  inComeSagaList(),
  identifyDocumentSagaList(),
  householdSagaList(),
  // productSagaList(),
  homeSagaList(),
  signupSagaList(),
  tokenSagaList(),
  UserSagaList(),
  listingManagementSagaList(),
  filterProductPageSagaList(),
  applicationSagaList(),
  favouriteProductPageSagaList(),
  forgotPasswordSagaList(),
  bookingSagaList(),
  paymentSagaList()
]

export default function* () {
  yield all(sagasList)
}
