const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')
    // Load tasks from /api/tasks
const showURLs = async() => {
    loadingDOM.style.visibility = 'visible'
    try {
        const {
            data: { savedURLs }
        } = await axios.get('/tbb')
        if (savedURLs.length < 1) {
            tasksDOM.innerHTML = '<h5 class="empty-list">No URL in list</h5>'
            loadingDOM.style.visibility = 'hidden'
            return
        }
        // console.log(savedURLs)
        const allUrls = savedURLs
            .map((url) => {
                const { _id: urlID, ShortenedURL, InputURL, count } = url
                // console.log(InputURL);
                return `<ol class="list-group">
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold"><h5>${InputURL}</h5></div>
                                <hr>
                                <h5>URL After Shrinking</h5>
                                <h6 style="color:blue;">${ShortenedURL}</h6>
                            </div>
                         <button type="button" class="delete-btn" data-id="${urlID}">
                            <i class="fas fa-trash"></i>
                            </button>
                            </li>
                        </ol>`


            })
            .join('')
        tasksDOM.innerHTML = allUrls
    } catch (error) {
        tasksDOM.innerHTML =
            '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
    loadingDOM.style.visibility = 'hidden'
}

showURLs()

// delete task /api/tasks/:id

tasksDOM.addEventListener('click', async(e) => {
    const el = e.target
    if (el.parentElement.classList.contains('delete-btn')) {
        loadingDOM.style.visibility = 'visible'
        const id = el.parentElement.dataset.id
        try {
            await axios.delete(`/tbb/${id}`)
            showURLs()
        } catch (error) {
            console.log(error)
        }
    }
    loadingDOM.style.visibility = 'hidden'
})

// form

formDOM.addEventListener('submit', async(e) => {
    e.preventDefault()
    const InputURL = taskInputDOM.value

    try {
        await axios.post('/tbb', { InputURL })
        showURLs()
        taskInputDOM.value = ''
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `success, task added`
        formAlertDOM.classList.add('text-success')
    } catch (error) {
        console.log(error)
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('text-success')
    }, 3000)
})