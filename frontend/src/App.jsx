import React from 'react'
import JobseekerLogin from './pages/JobseekerLogin';
import JobseekerRegister from './pages/JobseekerRegister';
import JobseekerProfile from './pages/JobseekerProfile';  
import JobRecruiterRegister from './pages/JobRecruiterRegister';
import JobRecruiterLogin from './pages/JobRecruiterLogin';
import JobPosting from './pages/JobPosting';
const App = () => {
  return (
    <>
      <JobseekerRegister />
      <JobseekerLogin />
      <JobRecruiterRegister />
      <JobRecruiterLogin />
      <JobseekerProfile />
      <JobPosting />
    </>
  )
}

export default App
