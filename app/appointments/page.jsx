"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const formDataInitialState = {
  doctorId: "",
  patientId: "",
  notes: "",
  dateTime: "",
};

export default function Page() {
  const [formData, setFormData] = useState(formDataInitialState);
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsUpdate(false);
    setIsOpen(false);
    setFormData(formDataInitialState);

  };

  const [getData, setGetData] = useState([]);

  // Create Appointment
  const handleCreateUser = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/createappointments", formData)
      .then((response) => {
        console.log("Appointment created successfully!!");
        console.log("response.data : ", response.data);
        setGetData((usersData) => [...usersData, response.data]);
        setFormData(formDataInitialState);
        setIsOpen(false)
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  // Read Data
  useEffect(() => {
    axios
      .get('http://localhost:8000/appointments')
      .then((response) => {
        setGetData(response.data);
      })
      .catch((error) => {
        console.error("Error : ", error.massage);
      });
  }, []);


  // Delete Student
  const handleDelete = (userId) => {
    console.log(userId, getData);
    axios
      .delete(`http://localhost:8000/deleteappointment/${userId}`)
      .then((response) => {
        const updateData = getData.filter((user) => user._id !== userId);
        setGetData(updateData);
        message.info('Appointment Deleted Successfully!');
        console.log(getData);
      })
      .catch((error) => {
        console.error("Error : ", error.massage)
      });
  };

  // Update Apointment
  const handleUpdate = (user) => {
    setFormData(user);
    setIsOpen(true);
    setIsUpdate(true);

  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:8000/updateappointment/" + formData._id, formData)
      .then((response) => {
        console.log("Appointment updated successfully!!");

        const tempUsers = getData.map((userData) => {
          return userData._id != formData._id ? userData : formData;
        });

        setGetData(tempUsers);
        setFormData(formDataInitialState);
        setIsOpen(false);
        setIsUpdate(false);

      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  return (
    <>
      <div
        className="bg-neutral-50 px-6 py-20 text-center text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200 min-h-screen">
        <div className="m-auto mt-5 flex flex-col max-w-5xl">
          <div className="sm:-mx-6 lg:-mx-8 bg-current bg-slate-100 py-5">
            <div className='flex justify-around'>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                onClick={() => router.back()}
                stroke="currentColor"
                className="h-8 w-8">

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h1 className='text-2xl font-bold'>Appointment Lists</h1>
              <button type='button'
                onClick={handleOpenModal}
                className="inline-block rounded bg-sky-500/100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                Add Oppointment
              </button>
            </div>
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">#</th>
                    <th scope="col" className="px-6 py-4">Doctor Id</th>
                    <th scope="col" className="px-6 py-4">Patient Id</th>
                    <th scope="col" className="px-6 py-4">Date & Time</th>
                    <th scope="col" className="px-6 py-4">Notes</th>
                    <th scope="col" className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    getData.map((user, index) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{user.doctorId}</td>
                        <td className="px-6 py-4">{user.patientId}</td>
                        <td className="px-6 py-4">{user.dateTime}</td>
                        <td className="px-6 py-4">{user.notes}</td>
                        <td className="px-6 py-4 flex justify-left">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            onClick={() => handleUpdate(user)}
                            className="h-8 w-8 mx-1.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            onClick={() => { handleDelete(user._id) }}
                            className="h-8 w-8">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                          </svg>
                        </td>
                      </tr>
                    )
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Main modal --> */}
      {isOpen && (
        // <!-- Main modal -->
        <div id="default-modal" aria-labelledby="modal-title" role="dialog" aria-modal="true" tabindex="-1" aria-hidden="true" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative p-4 w-full max-w-xl p-5 max-h-full">
            {/* <!-- Modal content --> */}
            <div class=" bg-gray-200 relative bg-white p-5 rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl text-center font-semibold text-gray-900 dark:text-white">
                  Add Appointment
                </h3>
                <button type="button" onClick={handleCloseModal} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <form className='p-5'>
                {/* Doctor ID */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleInput125"
                    value={formData.doctorId}
                    onChange={(e) => handleChange(e)}
                    name='doctorId'
                    placeholder="Doctor Id" />
                  <label
                    for="exampleInput125"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                  >Doctor Id
                  </label>
                </div>

                {/* Patient ID */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleInput125"
                    value={formData.patientId}
                    name='patientId'
                    onChange={(e) => handleChange(e)}
                    placeholder="Patient Id" />
                  <label
                    for="exampleInput125"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                  >Patient Id
                  </label>
                </div>

                {/* <!--Email input--> */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleInput125"
                    value={formData.notes}
                    name='notes'
                    onChange={(e) => handleChange(e)}
                    placeholder="Notes" />
                  <label
                    for="exampleInput125"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                  >Notes
                  </label>
                </div>

                {/* <!--Date and Time input--> */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleInput125"
                    value={formData.dateTime}
                    name='dateTime'
                    onChange={(e) => handleChange(e)}
                    placeholder="Date & Time" />
                  <label
                    for="exampleInput125"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                  >dateTime
                  </label>
                </div>
              </form>
              {/* <!-- Modal footer --> */}
              <div class="flex justify-center items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                {isUpdate ?
                  <button onClick={handleUpdateUser} data-modal-hide="default-modal" type="button" class="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                  : <button onClick={handleCreateUser} data-modal-hide="default-modal" type="button" class="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>}
                <button onClick={handleCloseModal} data-modal-hide="default-modal" type="button" class="w-32 ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
              </div>
            </div>
          </div>
        </div>

      )}
    </>
  )
}
