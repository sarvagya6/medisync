import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline'

const cases = [
  {
    _id: 1,
    doctor: 'Dr. John Doe',
    doctorId: 1,
    patient: 'Harry potter',
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
  // More cases...
]

export const Case = () => {

    const { id: caseId } = useParams();

    const [analysedImage, setAnalysedImage] = useState(null);

    // sending image from the document to django server for analysis in a form of a post request
    const handleAnanlysis = (img) => {
       // check if we have image file or image url
       // if image url then convert it to image file bolb
        // if image file then send it to server
        const formData = new FormData();
        if (img.startsWith('http')) {
            fetch(img)
                .then(res => res.blob())
                .then(blob => {
                    formData.append('image', blob);
                    fetch('http://127.0.0.1:8000/api/', {
                        method: 'POST',
                        body: formData
                    })
                        .then(res => res.json())
                        .then(
                            data => {
                                console.log(data);
                                setAnalysedImage(data);
                            }
                        )
                        .catch(err => console.log(err));
                })
        } else {
            formData.append('image', img);
            fetch('http://127.0.0.1:8000/api/', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err));
            } 
    }

    return (
        <div className="bg-white">
          <div className="mx-auto max-w-4xl py-16 sm:px-6 sm:py-24">
            <div className="px-4 sm:px-0">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Case #{caseId}</h1>
              <p className="mt-2 text-sm text-gray-500">
                Check the case in more details and try our AI X-ray analysis tool.
              </p>
            </div>
    
            <div className="mt-16">
              <h2 className="sr-only">Recent cases</h2>
    
              <div className="space-y-16 sm:space-y-24">
                {cases.map((item, index) => (
                  <div key={index}>
                    <h3 className="sr-only">
                      Order placed on <time dateTime={item.datetime}>{item.date}</time>
                    </h3>
    
                    <div className="bg-gray-50 px-4 py-6 sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
                      <dl className="flex-auto space-y-4 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-3 md:gap-x-6 md:space-y-0 md:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                      <div className="flex justify-between pt-4 md:block md:pt-0">
                          <dt className="font-medium text-gray-900">Date</dt>
                          <dd className="md:mt-1">
                            <time dateTime={item.datetime}>{item.date}</time>
                          </dd>
                        </div>
                        <div className="flex justify-between md:block">
                          <dt className="font-medium text-gray-900">Doctor</dt>
                          <dd className="md:mt-1">{item.doctor}</dd>
                        </div>
                        <div className="flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0">
                          <dt>Hospital</dt>
                          <dd className="md:mt-1">{item.hospital}</dd>
                        </div>
                      </dl>
                      <div className="mt-6 space-y-4 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0">
                        
                        <a
                          href={'/case/' + caseId}
                          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto"
                        >
                          View Claims
                        </a>
                      </div>
                    </div>
    
                    <div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
                      <div className="-my-6 divide-y divide-gray-200 sm:-my-10">
                        {item.document.map((doc, index) => (
                          <div key={index} className="flex py-6 sm:py-10">
                            <div className="min-w-0 flex-1 lg:flex lg:flex-col">
                              <div className="lg:flex-1">
                                <div className="sm:flex">
                                  <div>
                                    <h4 className="font-medium text-gray-900">{doc.name}</h4>
                                    <p className="mt-2 hidden text-sm text-gray-500 sm:block">{doc.description}</p>
                                  </div>
                                </div>
                                <div className="mt-2 flex text-sm font-medium sm:mt-4">
                                  <a href={doc.href} className="text-indigo-600 hover:text-indigo-500">
                                    Download X-Ray
                                  </a>
                                </div>
                              </div>
                              <div className="mt-6 font-medium">
                                {/* write a sumbitHandler function to send image to server  and pervent default*/}
                                    <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        handleAnanlysis(doc.imageSrc);
                                    }}
                                    className="flex w-full items-center justify-center rounded-md border border-pink-500 text-pink-500 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto"
                                    > AI Powered X-Ray Analysis{' '}
                                    <DocumentMagnifyingGlassIcon className="h-6 w-6 flex-none text-pink-500" aria-hidden="true" />
                                    </button>
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0 sm:order-first sm:m-0 sm:mr-6">
                              <img
                                src={doc.imageSrc}
                                alt={doc.imageAlt}
                                className="col-start-2 col-end-3 h-20 w-20 rounded-lg object-cover object-center sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:h-40 sm:w-40 lg:h-52 lg:w-52"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
}
