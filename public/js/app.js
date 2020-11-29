const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgone = document.querySelector('#msg1')
const msgtwo = document.querySelector('#msg2')

msgone.textContent = ''
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    
    msgone.textContent = 'Loading...'
    msgtwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            msgone.textContent = data.error
        }
        else{
            msgone.textContent = data.location
            msgtwo.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
})