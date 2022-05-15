function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function isEmptyObject(obj) {
  const arr = Object.keys(obj);
  return arr.length === 0;
}

export { getBase64,isEmptyObject };
