import Cookies from 'js-cookie';
import axios from 'axios';

const token = Cookies.get('token');

export function setToken(token) {
  Cookies.set('token', token);
}

export function removeToken() {
  Cookies.remove('token');
}

export async function validateToken() {
  console.log("loginnnnnnnnnnn")
  if (token) {
    const config = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${token}`
      }
    };
    console.log("loginnnnnnnnnnn"+ token)
    try {
      const response = await  axios.post(`https://localhost:7202/api/Login/ValidateToken`,token, config)
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      return response;
    } catch (error) {
      console.error('Error:', error);
      return "";
    }
  } else {
    console.error('Validate Fail!.');
    return "";
  }
}

const auth = {
  token,
  setToken,
  removeToken,
  validateToken
};

export default auth;
