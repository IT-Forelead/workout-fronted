export default function authHeaderForMultipart() {
  let user = JSON.parse(localStorage.getItem('token'));
  if (user && user.value) {
    return 'Bearer ' + user.value;
  } else {
    return {};
  }
}