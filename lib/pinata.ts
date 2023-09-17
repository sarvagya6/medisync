import { db } from "@/lib//db";

// const pinataSDK = require('@pinata/sdk');
// const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT_KEY});

// export async function uploadToPinata(file: any, caseID: string) {
//     const readableStreamForFile = file.stream;
//     const options = {
//         pinataMetadata: {
//             name: file.name,
//             keyvalues: {
//                 caseID: caseID,
//             },
//         },
//         pinataOptions: {
//             cidVersion: 0,
//         },
//     };
//     const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
//     return result;
// }

// export async function getPinataPinList(caseID: string) {
//     const result = await pinata.pinList({
//         metadata: {
//             keyvalues: {
//                 caseID: caseID,
//             },
//         },
//     });
//     return result;
// }

// interface PinataPin {
//     //array of hashes
//     data: string[],
//     [key: string]: any;
// }

// export async function updateUserCaseWithHash(caseID: string, hash: PinataPin) {
//     const result = await db.case.update({
//         where: {
//             id: caseID,
//         },
//         //data is a JSON value of array of hashes
//         data: {
//             data: hash,
//         },
//     });
//     return result;
// }

const headers = {
    'Content-Type': 'application/json',
    'authorization': 'Bearer ' + process.env.PINATA_JWT_KEY,
}

export async function uploadToPinata(file: any, caseID: string) {
    const readableStreamForFile = file.stream;
    const options = {
        pinataMetadata: {
            name: file.name,
            keyvalues: {
                caseID: caseID,
            },
        },
        pinataOptions: {
            cidVersion: 0,
        },
    };
    const result = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(options),
    });
    return result;
}

export async function getPinataPinList(caseID: string) {
    const result = await fetch('https://api.pinata.cloud/data/pinList?metadata[keyvalues][caseID]=' + caseID, {
        method: 'GET',
        headers: headers,
    });
    return result;
}

interface PinataPin {
    //array of hashes
    data: string[],
    [key: string]: any;
}

export async function updateUserCaseWithHash(caseID: string, hash: PinataPin) {
    
    const result = await db.case.update({
        where: {
            id: caseID,
        },
        //data is a JSON value of array of hashes
        data: {
            data: hash,
        },
    });
    
    return result;
}
