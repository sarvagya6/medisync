import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
  Bars3Icon,
  EllipsisVerticalIcon,
  PlusSmallIcon,
} from '@heroicons/react/20/solid'

const secondaryNavigation = [
  { name: 'Last 7 days', href: '#', current: true },
  { name: 'Last 30 days', href: '#', current: false },
  { name: 'All-time', href: '#', current: false },
]
const stats = [
  { name: 'Cases', value: '8', change: '+4.75%', changeType: 'positive' },
  { name: 'Appoinments', value: '4', change: '+54.02%', changeType: 'negative' },
  { name: 'Message', value: '5', change: '-1.39%', changeType: 'positive' },
  { name: 'Reports', value: '12', change: '+10.18%', changeType: 'negative' },
]
const statuses = {
  Join: 'text-green-700 bg-green-50 ring-green-600/20',
  Edit: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Cancel: 'text-red-700 bg-red-50 ring-red-600/10',
}
const days = [
  {
    date: 'Today',
    dateTime: '2023-03-22',
    transactions: [
      {
        id: 1,
        invoiceNumber: '00012',
        href: '#',
        amount: '$7,600.00 USD',
        tax: '$500.00',
        status: 'Paid',
        client: 'Reform',
        description: 'Website redesign',
        icon: ArrowUpCircleIcon,
      },
      {
        id: 2,
        invoiceNumber: '00011',
        href: '#',
        amount: '$10,000.00 USD',
        status: 'Withdraw',
        client: 'Tom Cook',
        description: 'Salary',
        icon: ArrowDownCircleIcon,
      },
      {
        id: 3,
        invoiceNumber: '00009',
        href: '#',
        amount: '$2,000.00 USD',
        tax: '$130.00',
        status: 'Overdue',
        client: 'Tuple',
        description: 'Logo design',
        icon: ArrowPathIcon,
      },
    ],
  },
  {
    date: 'Yesterday',
    dateTime: '2023-03-21',
    transactions: [
      {
        id: 4,
        invoiceNumber: '00010',
        href: '#',
        amount: '$14,000.00 USD',
        tax: '$900.00',
        status: 'Paid',
        client: 'SavvyCal',
        description: 'Website redesign',
        icon: ArrowUpCircleIcon,
      },
    ],
  },
]
const clients = [
  {
    id: 1,
    name: 'Dr. Tuple',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    lastInvoice: { date: 'December 13, 2022', dateTime: '2022-12-13', case: 'Chest Pain', status: 'Join' },
  },
  {
    id: 2,
    name: 'Dr. SavvyCal',
    imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    lastInvoice: { date: 'January 22, 2023', dateTime: '2023-01-22', case: 'Phemonia Routine', status: 'Edit' },
  },
  {
    id: 3,
    name: 'Dr. Reform',
    imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', case: 'COVID Test Results', status: 'Cancel' },
  },
]

const appointments = [
  {
    _id: 1,
    doctor: {
      _id: 1,
      name: 'Dr. John Doe',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    patient: 14,
    datetime: 'January 22, 2021 10:00 AM',
    case: {
      _id: 1,
      name: 'Chest Pain',
    },
    isDocReady: true,
  },
  {
    _id: 2,
    doctor: {
      _id: 2,
      name: 'Dr. Reform',
    imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    patient: 14,
    datetime: 'January 22, 2021 10:00 AM',
    case: {
      _id: 1,
      name: 'Phemonia Routine',
    },
    isDocReady: false,
  },
  {
    _id: 3,
    doctor: {
      _id: 3,
      name: 'Dr. SavvyCal',
    imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    patient: 14,
    datetime: 'January 22, 2021 10:00 AM',
    case: {
      _id: 1,
      name: 'COVID Test Results',
    },
    isDocReady: false,
  }
]

const cases = [
  {
    _id: 1,
    doctor: 'Dr. John Doe',
    doctorId: 1,
    patient: 'Arnav Elon',
    patientId: 14,
    date: 'January 22, 2021',
    datetime: '2021-01-22',
    hospital: 'UPSC',
    document: [
      {
        _id: 1,
        name: 'Chest X-ray',
        description:
          "X-Ray Findings: laura ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
        date: 'January 5, 2021',
        datetime: '2021-01-05',
        imageSrc: 'http://127.0.0.1:8000/media/image/1694942054376010/test.png',
        imageAlt: 'X-Ray Findings: laura ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.',
      },
      // More products...
    ],
  },
  {
    _id: 2,
    doctor: 'Dr. Watson',
    doctorId: 12,
    patient: 'Harry potter',
    patientId: 14,
    date: 'March 22, 2021',
    datetime: '2021-04-22',
    hospital: 'UPSC',
    document: [
      {
        _id: 1,
        name: 'Peumonia X-ray',
        description:
          "X-Ray Findings: laura ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
        date: 'January 5, 2021',
        datetime: '2021-01-05',
        imageSrc: 'http://127.0.0.1:8000/media/image/1694942054376010/test.png',
        imageAlt: 'X-Ray Findings: laura ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.',
      },
      // More products...
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export const Dashboard = () => {

    return (
      <>
        <main>
          <div className="relative isolate overflow-hidden pt-16">

  
            {/* Stats */}
            <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
              <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
                {stats.map((stat, statIdx) => (
                  <div
                    key={stat.name}
                    className={classNames(
                      statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
                      'flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8'
                    )}
                  >
                    <dt className="text-sm font-medium leading-6 text-gray-500">{stat.name}</dt>
                    <dd
                      className={classNames(
                        stat.Doctor === 'negative' ? 'text-rose-600' : 'text-gray-700',
                        'text-xs font-medium'
                      )}
                    >
                      {stat.Doctor}
                    </dd>
                    <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
  
            <div
              className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
              aria-hidden="true"
            >
              <div
                className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                style={{
                  clipPath:
                    'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                }}
              />
            </div>
          </div>
  
          <div className="space-y-16 py-16 xl:space-y-20">
            {/* Recent activity table */}
            <div>

            <div className="mx-auto mb-8 border rounded-lg pt-4 px-4 max-w-7xl sm:px-6 lg:px-8">
      <div className="sm:flex  sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Cases List</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-pink-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
          >
            Add a Case
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Doctor
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Hospital
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {cases.map((item, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                      {item.patient}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.doctor}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.hospital}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.date}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                      <a href={`/case/${item._id}`} className="text-pink-600 hover:text-pink-900">
                        View<span className="sr-only">, {item.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

            </div>
  
            {/* Recent client list*/}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Upcomming Appointments</h2>
                  <a href="#" className="text-sm font-semibold leading-6 text-pink-600 hover:text-pink-500">
                    View all<span className="sr-only">, clients</span>
                  </a>
                </div>
                <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                  {appointments.map((meeting, index) => (
                    <li key={index} className="overflow-hidden rounded-xl border border-gray-200">
                      <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                        <img
                          src={meeting.doctor.imageUrl}
                          alt={meeting.doctor.name}
                          className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                        />
                        <div className="text-sm font-medium leading-6 text-gray-900">{meeting.doctor.name}</div>
                        <div className="relative ml-auto align-middle flex">
                        <button className='inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium  ring-1 ring-inset'>
                          {meeting.isDocReady ? 'Join VR Room' : 'Cancel VR Room'}
                          </button>
                        <Menu as="div" className="relative ml-auto">
                          <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Open options</span>
                            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? 'bg-gray-50' : '',
                                      'block px-3 py-1 text-sm leading-6 text-gray-900'
                                    )}
                                  >
                                    View<span className="sr-only">, {meeting.doctor.name}</span>
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? 'bg-gray-50' : '',
                                      'block px-3 py-1 text-sm leading-6 text-gray-900'
                                    )}
                                  >
                                    Edit<span className="sr-only">, {meeting.doctor.name}</span>
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                        </div>
                      </div>
                      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                        <div className="flex justify-between gap-x-4 py-3">
                          <dt className="text-gray-500">Date</dt>
                          <dd className="text-gray-700">
                            <time dateTime={meeting.datetime}>{meeting.datetime}</time>
                          </dd>
                        </div>
                        <div className="flex justify-between gap-x-4 py-3">
                          <dt className="text-gray-500">Case</dt>
                          <dd className="flex items-start gap-x-2">
                            <div className="font-medium text-gray-900">{meeting.case.name}</div>
                          </dd>
                        </div>
                      </dl>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </>
    )
}
