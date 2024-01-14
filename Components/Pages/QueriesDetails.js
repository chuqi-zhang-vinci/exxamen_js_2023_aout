const management = async () => {
    try{
        const response = await fetch('/api/queries', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
        }

        const queries = await response.json();
        
        const main = document.querySelector('main');

         const queriesList = queries.map(query => `
         <div class="card mb-3">
             <div class="card-body">
                 <h5 class="card-title">Demande #${query.id}</h5>
                 <p class="card-text">Sujet: ${query.subject}</p>
                 <label for="statusFilter_${query.id}">Statut :</label>
                 <select id="statusFilter_${query.id}" class="form-select">
                     <option value="requested" ${query.status === 'requested' ? 'selected' : ''}>requested</option>
                     <option value="accepted" ${query.status === 'accepted' ? 'selected' : ''}>accepted</option>
                     <option value="refused" ${query.status === 'refused' ? 'selected' : ''}>refused</option>
                     <option value="done" ${query.status === 'done' ? 'selected' : ''}>done</option>
                 </select>
             </div>
         </div>
     `).join('');

     main.innerHTML = `
         ${queriesList}
     `;



    } catch (error) {
        console.error('Error:', error);
    }
}

export default management;