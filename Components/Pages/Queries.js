const create = async () => {
    const main = document.querySelector('main');

    main.innerHTML = `
    <div class="container mt-5">
        <form id="queryForm">
        <h3>Create a query Page</h3>
        <p>Subject of your query</p>
        <div class="form-group">
            <input type="text" class="form-control" id="exampleInput">
            <p>Please provide the subject of your query regarding some new content.</p>
        </div>
        <button type="submit" class="btn btn-primary" id="actionButton">Submit</button>
        </form>
    </div>
    `


    const actionButton = document.querySelector('#actionButton');
    actionButton.addEventListener('click', () => {
        window.location.href = '/queries';
    })

    const queryForm = document.querySelector('#queryForm');
    queryForm.addEventListener('submit', async (event) =>{
        event.preventDefault();

        const subject = document.querySelector('#exampleInput');
        const subjectValue = subject.value;

        try{
            const response = await fetch('/api/queries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject:subjectValue,
                    status:"requested", 
                })
            });
            if (!response.ok) {
                throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
            }
            
        }catch (error) {
            console.error('Error:', error);
        }
    })
};

export default create;