
// API request
const URL = 'https://randomuser.me/api/?results=12';

getUsers(URL);

let result = []

async function getUsers(url) {
    const res = await fetch(url);
    let data = await res.json();
    result = data.results;
    console.log(result);
    renderUsers(result);
    userModal(result);
    return result;
}

// Javascript Selectors

const gallery = document.querySelector('.gallery');
const card = document.querySelector('.card');
const card_img = document.querySelector('.card-img');
const card_name = document.querySelector('#name');
const card_email = document.querySelector('.card-text');
const card_city = document.querySelector('.card-text.cap');

let modalContainer = document.querySelector('.modal-container');
const modalCloseBtn = document.querySelector('#modal-close-btn');
const modalImage = document.querySelector('.modal-img');
const modalName = document.querySelector('.modal-name');
const modalEmail = document.querySelector('.modal-text');
const modalCity = document.querySelector('.modal-text.cap');
const modalMobile = document.querySelector('.mobile');
const modalAddress = document.querySelector('.address');
const modalBirthday = document.querySelector('.birthday');

const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const searchSubmit = document.querySelector('#search-submit');

// Render section
function renderUsers(users) {

    let result = '';
    users.forEach(user => {
        const userImage = user.picture.medium;
        const userFirstName = user.name.first;
        const userLastName = user.name.last;
        const userEmail = user.email;
        const userCity = user.location.city;

        result += `
                    <div class="card card-data">
                        <div class="card-img-container">
                            <img class="card-img" src="${userImage}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${userFirstName + ' ' + userLastName}</h3>
                            <p class="card-text">${userEmail}</p>
                            <p class="card-text cap ">${userCity}</p>
                        </div>
                    </div>
                    `;

        let markup = '';
        markup += `
                      <div class="modal-container">
                          <div class="modal">
                              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                              <div class="modal-info-container">
                                  <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                                  <h3 id="name" class="modal-name cap">${user.name.title + ' ' + user.name.first + ' ' +
            user.name.last}</h3>
                                  <p class="modal-text">${user.email}</p>
                                  <p class="modal-text cap">${user.location.city}, ${user.location.country}</p>
                                  <hr>
                                  <p class="modal-text">${user.phone}</p>
                                  <p class="modal-text">${user.location.street.number} ${user.location.street.name},
                                      ${user.location.state}, ${user.location.postcode}</p>
                                  <p class="modal-text">Birthday: ${getDate(user.dob.date)}</p>
                              </div>
                          </div>
                      </div>`;
        modalContainer.innerHTML = markup;
    })
    gallery.innerHTML = result;

    document.querySelectorAll('.card.card-data').forEach(modal => {
        modal.addEventListener('click', e => {
            console.log(e.value);
            e.target.closest('.card').addEventListener('click', (e) => {
                e.preventDefault();
                openModal(e);
            });
        })
    });


}

const openModal = (event) => {

    let modalCard = event.target.closest('.card');
    modalContainer == modalCard
    modalContainer.style.display = "block";
}



modalContainer.style.display = "none";

const userModal = (data) => {

    // let markup = '';
    // data.forEach((user) => {
    //     markup += `
    //             <div class="modal-container">
    //                 <div class="modal">
    //                     <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    //                     <div class="modal-info-container">
    //                         <img class="modal-img" src="${user.picture.large}" alt="profile picture">
    //                         <h3 id="name" class="modal-name cap">${user.name.title + ' ' + user.name.first + ' ' +
    //         user.name.last}</h3>
    //                         <p class="modal-text">${user.email}</p>
    //                         <p class="modal-text cap">${user.location.city}, ${user.location.country}</p>
    //                         <hr>
    //                         <p class="modal-text">${user.phone}</p>
    //                         <p class="modal-text">${user.location.street.number} ${user.location.street.name},
    //                             ${user.location.state}, ${user.location.postcode}</p>
    //                         <p class="modal-text">Birthday: ${getDate(user.dob.date)}</p>
    //                     </div>
    //                 </div>
    //             </div>`;
    // });
    // modalContainer.innerHTML = markup;


    document.querySelectorAll('.modal-close-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // e.target.closest('.modal-container').style.display = "none";
            modalContainer.style.display = "none";

        })
    });

}


function getDate(DOB_date) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const date = new Date(DOB_date).toLocaleDateString('en-Us', options);
    return date;
}


//  Search user

searchInput.addEventListener('input', (e) => {
    const searchVal = e.target.value.toLowerCase();

    const filteredUser = result.filter((user) => {
        return (
            user.name.first.toLowerCase().includes(searchVal) ||
            user.name.last.toLowerCase().includes(searchVal)
        )
    });
    renderUsers(filteredUser);

    document.querySelectorAll('.modal-close-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // e.target.closest('.modal-container').style.display = "none";
            modalContainer.style.display = "none";

        })
    });
});


