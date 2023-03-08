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
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import TimeSlotsLayout from 'src/layouts/TimeSlotsLayout'
import UsersLayout from 'src/layouts/UsersLayout'

import { useAuth } from './auth'
import UserProfilePage from './pages/UserProfilePage/UserProfilePage'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/review/{jubenId:Int}/{dm:String}" page={LeaveReviewPage} name="leaveReview" />
      <Route path="/admin" page={AdminPage} name="admin" />
      <Route path="/blogs" page={BlogsPage} name="blogs" />
      <Route path="/blog/{title:String}" page={BlogPage} name="blog" />
      <Route path="/user/{id:Int}" page={UserProfilePage} name="userProfile" />
      <Route path="/search" page={SearchPage} name="search" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/contact" page={ContactPage} name="contact" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/" page={HomePage} name="home" />

      <Private unauthenticated="home" roles="admin">
        <Route path="/user/me" page={UserProfilePage} name="userProfile" />
        <Set wrap={ScaffoldLayout} title="JubenDrives" titleTo="jubenDrives" buttonLabel="New JubenDrive" buttonTo="newJubenDrive">
          <Route path="/admin/jubenDrives/new" page={JubenDriveNewJubenDrivePage} name="newJubenDrive" />
          <Route path="/admin/jubenDrives/{id:Int}/edit" page={JubenDriveEditJubenDrivePage} name="editJubenDrive" />
          <Route path="/admin/jubenDrives/{id:Int}" page={JubenDriveJubenDrivePage} name="jubenDrive" />
          <Route path="/admin/jubenDrives" page={JubenDriveJubenDrivesPage} name="jubenDrives" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Reviews" titleTo="reviews" buttonLabel="New Review" buttonTo="newReview">
          <Route path="/admin/reviews/new" page={ReviewNewReviewPage} name="newReview" />
          <Route path="/admin/reviews/{id:Int}/edit" page={ReviewEditReviewPage} name="editReview" />
          <Route path="/admin/reviews/{id:Int}" page={ReviewReviewPage} name="review" />
          <Route path="/admin/reviews" page={ReviewReviewsPage} name="reviews" />
        </Set>
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
          <Route path="/admin/timeSlots/new" page={TimeSlotNewTimeSlotPage} name="newTimeSlot" />
          <Route path="/admin/timeSlots/{id:Int}/edit" page={TimeSlotEditTimeSlotPage} name="editTimeSlot" />
          <Route path="/admin/timeSlots/{id:Int}" page={TimeSlotTimeSlotPage} name="timeSlot" />
          <Route path="/admin/timeSlots" page={TimeSlotTimeSlotsPage} name="timeSlots" />
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
