import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../provider/AuthProvider"
import toast from "react-hot-toast"

const jobTags = [
  "Product Designer",
  "Frontend Engineer",
  "Data Analyst",
  "UX Researcher",
  "Marketing Lead",
  "DevOps Engineer",
]

const Login = () => {

  const navigate = useNavigate()

 const {signIn,signInWithGoogle} = useContext(AuthContext)

 //Google signin
 const handleGoogleSignIn =async() =>{
  try{
    await signInWithGoogle()
    toast.success('Signin Successful')
    navigate('/')
  }
  catch(err)
  {
    console.log(err)
    toast.error(err?.message)
  }

 }

 //email password signin
 const handleSignIn = async e=>{
  e.preventDefault()
  const form=e.target
  const email = form.email.value
  const pass= form.password.value 
  console.log({email,pass})

  try{
    //user login
    const result = await signIn(email,pass)
    console.log(result)
    navigate('/')
    toast.success('SignIn Successful')
  }
  catch (err){
    console.log(err)
    toast.error(err?.message)
  }
 }


  return (
    <div className="relative min-h-[calc(100vh-306px)] overflow-hidden bg-[#080D0B] px-4 py-10 text-[#F5F7F4]">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#FFB547]/10 blur-[120px] animate-pulse" />

        <div
          className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#5EEAD4]/5 blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="absolute left-[15%] top-[20%] h-2 w-2 rounded-full bg-[#FFB547] animate-ping" />

        <div
          className="absolute right-[18%] top-[30%] h-2 w-2 rounded-full bg-[#5EEAD4] animate-ping"
          style={{ animationDelay: "1.5s" }}
        />

        <div
          className="absolute bottom-[20%] left-[25%] h-1.5 w-1.5 rounded-full bg-[#FFB547] animate-ping"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Orbit */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#26332D] lg:block" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#FFB547]/20 lg:block" />

      {/* Floating tags */}
      <div className="absolute left-[5%] top-[18%] hidden rotate-[-6deg] rounded-full border border-[#26332D] bg-[#101815]/80 px-5 py-3 text-xs font-semibold text-[#8D9B94] shadow-xl backdrop-blur-md lg:block animate-[bounce_5s_ease-in-out_infinite]">
        ✦ Find your next role
      </div>

      <div
        className="absolute bottom-[16%] right-[5%] hidden rotate-[5deg] rounded-full border border-[#26332D] bg-[#101815]/80 px-5 py-3 text-xs font-semibold text-[#8D9B94] shadow-xl backdrop-blur-md lg:block animate-[bounce_6s_ease-in-out_infinite]"
      >
        ✦ Build your future
      </div>

      {/* Main */}
      <div className="relative z-10 mx-auto flex min-h-[650px] max-w-6xl items-center justify-center">

        <div className="w-full max-w-md rounded-[32px] border border-[#26332D] bg-[#101815]/90 p-2 shadow-[0_40px_100px_-30px_rgba(0,0,0,.8)] backdrop-blur-xl">

          <div className="rounded-[26px] bg-[#101815] px-6 py-9 sm:px-10">

            {/* Header */}
            <div className="mb-8 flex items-center justify-between">

              <Link
                to="/"
                className="text-2xl font-black tracking-tight text-[#F5F7F4]"
              >
                Job<span className="text-[#FFB547]">Nest</span>
              </Link>

              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#26332D] bg-[#16211C] text-[#FFB547] animate-pulse">
                ✦
              </div>

            </div>

            {/* Heading */}
            <div className="mb-7">

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#26332D] bg-[#16211C] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8D9B94]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5EEAD4]" />
                Welcome back
              </div>

              <h1 className="text-4xl font-black tracking-tight">
                Keep your
                <br />
                <span className="text-[#FFB547]">career moving.</span>
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#8D9B94]">
                Sign in to keep your search moving.
              </p>

            </div>

            {/* Google */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#26332D] bg-[#16211C] px-4 py-3.5 text-sm font-semibold text-[#F5F7F4] transition-all duration-300 hover:-translate-y-1 hover:border-[#FFB547]/50 hover:shadow-[0_15px_40px_-20px_#FFB547]"
            onClick={handleGoogleSignIn}>
              <svg className="h-5 w-5" viewBox="0 0 40 40">
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
            </button>

            {/* Divider */}
            <div className="my-7 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#26332D]" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#8D9B94]">
                or with email
              </span>
              <span className="h-px flex-1 bg-[#26332D]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSignIn}>

              <div className="mb-4">
                <label
                  htmlFor="LoggingEmailAddress"
                  className="mb-2 block text-xs font-bold text-[#8D9B94]"
                >
                  Email address
                </label>

                <input
                  id="LoggingEmailAddress"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-[#26332D] bg-[#080D0B] px-4 py-3.5 text-sm text-[#F5F7F4] outline-none transition-all duration-300 placeholder:text-[#52615A] focus:border-[#FFB547] focus:ring-4 focus:ring-[#FFB547]/10"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="loggingPassword"
                  className="mb-2 block text-xs font-bold text-[#8D9B94]"
                >
                  Password
                </label>

                <input
                  id="loggingPassword"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-[#26332D] bg-[#080D0B] px-4 py-3.5 text-sm text-[#F5F7F4] outline-none transition-all duration-300 placeholder:text-[#52615A] focus:border-[#FFB547] focus:ring-4 focus:ring-[#FFB547]/10"
                />
              </div>

              <button
                type="submit"
                className="group w-full rounded-2xl bg-[#FFB547] px-6 py-4 text-sm font-black text-[#080D0B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFC766] hover:shadow-[0_15px_40px_-15px_#FFB547]"
              >
                <span className="flex items-center justify-center gap-2">
                  Sign in
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </button>

            </form>

            {/* Register */}
            <div className="mt-7 text-center">
              <span className="text-xs text-[#8D9B94]">
                New to JobNest?
              </span>

              <Link
                to="/register"
                className="ml-2 text-xs font-bold text-[#FFB547] underline underline-offset-4 hover:text-[#FFC766]"
              >
                Create your account
              </Link>
            </div>

            {/* Tags */}
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {jobTags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#26332D] bg-[#16211C] px-3 py-1.5 text-[9px] font-semibold text-[#8D9B94]"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login