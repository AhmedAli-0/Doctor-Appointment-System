"use client"
import React, { useEffect, useState } from 'react'

const initialState = { name: "", email: "", specialization: "" }

export default function Page() {
  const [state, setState] = useState(initialState)
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"));
    console.log("userId", userId)


    getUserById(userId)
      .then((user) => {
        if (user) {
          console.log(`User found: ${user.username}`);
        } else {
          console.log('User not found');
        }
      })
      .catch((error) => {
        console.error('Error retrieving user:', error);
      });

    console.log("state", state)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let { name, email, specialization } = state

    if (!name) { return message.error("Please enter name") }
    if (!email) { return message.error("Please enter email") }
    if (!specialization) { return message.error("Please enter specialization") }

    axios
      .put("http://localhost:8000/docabout/" + state._id, state)
      .then((response) => {
        setInputData(inputDataInitialState);
        message.info('Doctor Update Successfully!');
      })
      .catch((error) => {
        console.error("Error : ", error.massage);
      });
  }

  return (
    // < !--TW Elements is free under AGPL, with commercial license required for specific uses.See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com --> 
    <main className='grid place-content-center min-h-screen'
      style={{
        backgroundPosition: "100%",
        backgroundImage: `url('https://source.unsplash.com/random/?docter')`,
        minHeight: "100vh",
      }}>

      <div
        className="block max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <form>

          {/* <!--Name input--> */}
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleInput125"
              value={state.name}
              onChange={handleChange}
              placeholder="Name" />
            <label
              for="exampleInput125"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
            >Name
            </label>
          </div>

          {/* <!--Email input--> */}
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="email"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleInput125"
              value={state.email}
              onChange={handleChange}
              placeholder="Email address" />
            <label
              for="exampleInput125"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
            >Email
            </label>
          </div>

          {/* <!--Password input--> */}
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="specialization"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleInput126"
              value={state.specialization}
              onChange={handleChange}
              placeholder="Specialization" />
            <label
              for="exampleInput126"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
            >Specialization
            </label>
          </div>

          {/* <!--Submit button--> */}
          <button
            type="submit"
            className="w-96 inline-block w-48 rounded bg-sky-500/75 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            onClick={handleSubmit}
            data-te-ripple-color="light">
            Update Ditails
          </button>
        </form>
      </div>
    </main>
  )
}
