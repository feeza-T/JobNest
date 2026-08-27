
import { Link, useNavigate } from "react-router-dom"
import {AuthContext} from '../../provider/AuthProvider'
import { useContext } from "react"
import toast from "react-hot-toast"

const Register = () => {
  
  const navigate= useNavigate()

const {
  signInWithGoogle,
  createUser,
  updateUserProfile,
  user,
  setUser
} = useContext(AuthContext)
  
  //SignUp
  const handleSignUp = async e=>{
    e.preventDefault()
    const form=e.target 
    const email = form.email.value
    const name= form.name.value 
    const photo = form.photo.value 
    const pass = form.password.value 
    console.log({email, pass, name, photo})

    try{
      //user registration
      const result = await createUser(email,pass)
      console.log(result)
      await updateUserProfile(name,photo)
      setUser({...user, photoUR : photo ,displayName: name })
       navigate(from,{replace : true})
      toast.success('SignUp successfully')
    }
    catch(err){
      console.log(err)
      toast.error(err?.message)

    }
  }

   //Google signin
 const handleGoogleSignIn =async() =>{
  try{
    await signInWithGoogle()
    toast.success('Signin Successful')
     navigate(from,{replace : true})
  }
  catch(err)
  {
    console.log(err)
    toast.error(err?.message)
  }

 }

 
 
  return (
    <div className="relative min-h-[calc(100vh-306px)] overflow-hidden bg-[#080D0B] px-4 py-10 text-[#F5F7F4]">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#FFB547]/10 blur-[120px] animate-pulse" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#5EEAD4]/5 blur-[120px] animate-pulse" />

        <div
          className="absolute left-[10%] top-[25%] h-2 w-2 rounded-full bg-[#FFB547] animate-ping"
          style={{ animationDelay: "1s" }}
        />

        <div
          className="absolute right-[15%] top-[20%] h-2 w-2 rounded-full bg-[#5EEAD4] animate-ping"
          style={{ animationDelay: "2s" }}
        />

        <div className="absolute left-[12%] bottom-[20%] h-32 w-32 rounded-full border border-[#26332D] animate-[spin_15s_linear_infinite]" />

        <div className="absolute right-[10%] bottom-[15%] h-52 w-52 rounded-full border border-dashed border-[#FFB547]/20 animate-[spin_20s_linear_infinite]" />

      </div>

      <div className="relative z-10 mx-auto flex min-h-[700px] max-w-6xl items-center justify-center">

        {/* Floating message */}
        <div className="absolute left-[3%] top-[12%] hidden max-w-[200px] rotate-[-5deg] rounded-2xl border border-[#26332D] bg-[#101815]/80 p-4 backdrop-blur-md lg:block animate-[bounce_5s_ease-in-out_infinite]">

          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#5EEAD4]">
            Your next chapter
          </p>

          <p className="mt-2 text-sm font-semibold leading-5 text-[#F5F7F4]">
            Starts with one small step.
          </p>

        </div>

        {/* Floating stat */}
        <div className="absolute bottom-[12%] right-[3%] hidden rounded-2xl border border-[#26332D] bg-[#101815]/80 px-5 py-4 backdrop-blur-md lg:block animate-[bounce_6s_ease-in-out_infinite]">

          <p className="text-2xl font-black text-[#FFB547]">
            01
          </p>

          <p className="text-[9px] uppercase tracking-widest text-[#8D9B94]">
            Create your profile
          </p>

        </div>

        {/* Card */}
        <div className="w-full max-w-5xl overflow-hidden rounded-[36px] border border-[#26332D] bg-[#101815] shadow-[0_40px_100px_-30px_rgba(0,0,0,.8)]">

          <div className="grid lg:grid-cols-[.85fr_1.15fr]">

            {/* Left side */}
            <div className="relative hidden overflow-hidden bg-[#101815] p-10 lg:flex lg:flex-col lg:justify-between">

              {/* Glow */}
              <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#FFB547]/10 blur-[100px]" />

              <div className="relative z-10">

                <Link
                  to="/"
                  className="text-3xl font-black tracking-tight"
                >
                  Job<span className="text-[#FFB547]">Nest</span>
                </Link>

                <div className="mt-24">

                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#26332D] bg-[#16211C] text-3xl text-[#FFB547] shadow-[0_0_40px_-10px_#FFB547] animate-pulse">
                    ✦
                  </div>

                  <h2 className="text-5xl font-black leading-[1.05] tracking-tight">
                    Build your
                    <br />
                    <span className="text-[#FFB547]">career.</span>
                  </h2>

                  <p className="mt-6 max-w-sm text-sm leading-7 text-[#8D9B94]">
                    Create your JobNest account and start discovering
                    opportunities built around your skills.
                  </p>

                </div>
              </div>

              {/* Career pills */}
              <div className="relative z-10">

                <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#8D9B94]">
                  Explore careers
                </p>

                <div className="flex flex-wrap gap-2">

                  <span className="rounded-full border border-[#26332D] bg-[#16211C] px-3 py-2 text-[10px] text-[#8D9B94]">
                    Design
                  </span>

                  <span className="rounded-full border border-[#26332D] bg-[#16211C] px-3 py-2 text-[10px] text-[#8D9B94]">
                    Development
                  </span>

                  <span className="rounded-full border border-[#26332D] bg-[#16211C] px-3 py-2 text-[10px] text-[#8D9B94]">
                    Analytics
                  </span>

                  <span className="rounded-full border border-[#26332D] bg-[#16211C] px-3 py-2 text-[10px] text-[#8D9B94]">
                    Marketing
                  </span>

                </div>

              </div>

            </div>

            {/* Form */}
            <div className="bg-[#101815] px-6 py-9 sm:px-10 lg:px-14 lg:py-12">

              {/* Mobile logo */}
              <div className="mb-7 lg:hidden">

                <Link
                  to="/"
                  className="text-2xl font-black tracking-tight"
                >
                  Job<span className="text-[#FFB547]">Nest</span>
                </Link>

              </div>

              {/* Heading */}
              <div className="mb-7">

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#26332D] bg-[#16211C] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8D9B94]">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#5EEAD4]" />

                  Join JobNest

                </div>

                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">

                  Create your
                  <br />

                  <span className="text-[#FFB547]">
                    career profile.
                  </span>

                </h1>

                <p className="mt-3 text-sm leading-6 text-[#8D9B94]">
                  Get Your Free Account Now.
                </p>

              </div>

              {/* Google */}
              <div 
              onClick={ handleGoogleSignIn}
              className="flex cursor-pointer items-center justify-center rounded-2xl border border-[#26332D] bg-[#16211C] px-4 py-3.5 text-sm font-semibold text-[#F5F7F4] transition-all duration-300 hover:-translate-y-1 hover:border-[#FFB547]/50 hover:shadow-[0_15px_40px_-20px_#FFB547]">

                <svg className="mr-3 h-5 w-5" viewBox="0 0 40 40">

                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />

                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />

                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />

                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />

                </svg>

                Sign in with Google

              </div>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">

                <span className="h-px flex-1 bg-[#26332D]" />

                <span className="text-[9px] uppercase tracking-[0.18em] text-[#8D9B94]">
                  or registration with email
                </span>

                <span className="h-px flex-1 bg-[#26332D]" />

              </div>

             <form onSubmit={handleSignUp}>

                {/* Username */}
                <div className="mb-4">

                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-bold text-[#8D9B94]"
                  >
                    Username
                  </label>

                  <input
                    id="name"
                    autoComplete="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-[#26332D] bg-[#080D0B] px-4 py-3.5 text-sm text-[#F5F7F4] outline-none transition-all duration-300 placeholder:text-[#52615A] focus:border-[#FFB547] focus:ring-4 focus:ring-[#FFB547]/10"
                  />

                </div>

                {/* Photo */}
                <div className="mb-4">

                  <label
                    htmlFor="photo"
                    className="mb-2 block text-xs font-bold text-[#8D9B94]"
                  >
                    Photo URL
                  </label>

                  <input
                    id="photo"
                    autoComplete="photo"
                    name="photo"
                    type="text"
                    placeholder="https://..."
                    className="w-full rounded-2xl border border-[#26332D] bg-[#080D0B] px-4 py-3.5 text-sm text-[#F5F7F4] outline-none transition-all duration-300 placeholder:text-[#52615A] focus:border-[#FFB547] focus:ring-4 focus:ring-[#FFB547]/10"
                  />

                </div>

                {/* Email */}
                <div className="mb-4">

                  <label
                    htmlFor="LoggingEmailAddress"
                    className="mb-2 block text-xs font-bold text-[#8D9B94]"
                  >
                    Email Address
                  </label>

                  <input
                    id="LoggingEmailAddress"
                    autoComplete="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-[#26332D] bg-[#080D0B] px-4 py-3.5 text-sm text-[#F5F7F4] outline-none transition-all duration-300 placeholder:text-[#52615A] focus:border-[#FFB547] focus:ring-4 focus:ring-[#FFB547]/10"
                  />

                </div>

                {/* Password */}
                <div className="mb-5">

                  <label
                    htmlFor="loggingPassword"
                    className="mb-2 block text-xs font-bold text-[#8D9B94]"
                  >
                    Password
                  </label>

                  <input
                    id="loggingPassword"
                    autoComplete="current-password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    className="w-full rounded-2xl border border-[#26332D] bg-[#080D0B] px-4 py-3.5 text-sm text-[#F5F7F4] outline-none transition-all duration-300 placeholder:text-[#52615A] focus:border-[#FFB547] focus:ring-4 focus:ring-[#FFB547]/10"
                  />

                </div>

                {/* Submit */}
                <button 
                  type="submit"
                  className="group w-full rounded-2xl bg-[#FFB547] px-6 py-4 text-sm font-black text-[#080D0B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFC766] hover:shadow-[0_15px_40px_-15px_#FFB547]"
                >
                  <span className="flex items-center justify-center gap-2">

                    Sign Up

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>

                  </span>
                </button>

              </form>

              {/* Login */}
              <div className="mt-7 text-center">

                <span className="text-xs text-[#8D9B94]">
                  Already have an account?
                </span>

                <Link
                  to="/login"
                  className="ml-2 text-xs font-bold text-[#FFB547] underline underline-offset-4 hover:text-[#FFC766]"
                >
                  Sign in
                </Link>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register