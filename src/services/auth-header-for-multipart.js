export default function authHeaderForMultipart() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user && user.value) {
    return 'Bearer ' + user.value;
  } else {
    return {};
  }
}