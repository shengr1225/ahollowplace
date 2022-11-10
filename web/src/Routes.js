// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private, Set } from '@redwoodjs/router'

import BookingsLayout from 'src/layouts/BookingsLayout'
import JubensLayout from 'src/layouts/JubensLayout'
import TimeSlotsLayout from 'src/layouts/TimeSlotsLayout'
import UsersLayout from 'src/layouts/UsersLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/user-profile/{id:Int}" page={UserProfilePage} name="userProfile" />
      <Route path="/search" page={SearchPage} name="search" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/contact" page={ContactPage} name="contact" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/" page={HomePage} name="home" />

      <Private unauthenticated="home" roles="admin">
        <Set wrap={UsersLayout}>
          <Route path="/admin/users/new" page={UserNewUserPage} name="newUser" />
          <Route path="/admin/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
          <Route path="/admin/users/{id:Int}" page={UserUserPage} name="user" />
          <Route path="/admin/users" page={UserUsersPage} name="users" />
        </Set>
        <Set wrap={JubensLayout}>
          <Route path="/admin/jubens/new" page={JubenNewJubenPage} name="newJuben" />
          <Route path="/admin/jubens/{id:Int}/edit" page={JubenEditJubenPage} name="editJuben" />
          <Route path="/admin/jubens/{id:Int}" page={JubenJubenPage} name="juben" />
          <Route path="/admin/jubens" page={JubenJubensPage} name="jubens" />
        </Set>
        <Set wrap={TimeSlotsLayout}>
          <Route path="/admin/time-slots/new" page={TimeSlotNewTimeSlotPage} name="newTimeSlot" />
          <Route path="/admin/time-slots/{id:Int}/edit" page={TimeSlotEditTimeSlotPage} name="editTimeSlot" />
          <Route path="/admin/time-slots/{id:Int}" page={TimeSlotTimeSlotPage} name="timeSlot" />
          <Route path="/admin/time-slots" page={TimeSlotTimeSlotsPage} name="timeSlots" />
        </Set>
        <Set wrap={BookingsLayout}>
          <Route path="/admin/bookings/new" page={BookingNewBookingPage} name="newBooking" />
          <Route path="/admin/bookings/{id:Int}/edit" page={BookingEditBookingPage} name="editBooking" />
          <Route path="/admin/bookings/{id:Int}" page={BookingBookingPage} name="booking" />
          <Route path="/admin/bookings" page={BookingBookingsPage} name="bookings" />
        </Set>
      </Private>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
