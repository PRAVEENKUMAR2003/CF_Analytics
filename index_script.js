const getHandle = () => {

const handle = document.getElementById('input-handle').value;
console.log(handle);

window.location.href = "/home.html?handle="+handle;

}