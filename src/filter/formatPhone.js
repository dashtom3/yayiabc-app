export const formatPhone = (value) => {
  let phone = '';
  if (value === null) {
    phone = '暂无联系方式'
    return phone;
  } else {
    let aPhone = value.split('')
    phone = aPhone.splice(-6, 3, '***');
    return aPhone.join('');
  }
}