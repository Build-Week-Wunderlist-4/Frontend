import axios from 'axios';

function AxiosWithAuth()
{
    return axios.create({
        baseURL: 'https://wunderlistbuild.herokuapp.com/',
        headers: {
            authorization: localStorage.getItem('token')
        }
    })
}

export default AxiosWithAuth;