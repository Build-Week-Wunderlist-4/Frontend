import axios from 'axios';

function axiosWithAuth()
{
    return axios.create({
        baseURL: 'https://wunderlistbuild.herokuapp.com/api',
        headers: {
            authorization: localStorage.getItem('token')
        }
    })
}

export default axiosWithAuth;