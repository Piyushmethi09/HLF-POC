import axios from 'axios';

export function GetAPI (breed) {
    return new Promise((resolve,reject) => {
        axios.get(`http://localhost:8000/api/getList`)
        .then((response) => {
            console.log("--->>>>",response)
            resolve(response)
        })
        .catch((error) => {
            reject(error);
        });
    })
}
export function AddAPI (addData) {
    return new Promise((resolve,reject) => {
        axios.post(`http://localhost:8000/api/add`,addData)
        .then((response) => {
            console.log("--->>>>",response)
            resolve(response)
        })
        .catch((error) => {
            reject(error);
        });
    })
}