function submitForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var comments = document.getElementById('comments').value;
    var users = document.getElementById('users').value;

    // Display the submitted data in the respective pricing plan cards
    document.getElementById('plan1CardBody').innerHTML = `Name: ${name}<br>Email: ${email}<br>Comments: ${comments}`;
    document.getElementById('plan2CardBody').innerHTML = `Name: ${name}<br>Email: ${email}<br>Comments: ${comments}`;
    document.getElementById('plan3CardBody').innerHTML = `Name: ${name}<br>Email: ${email}<br>Comments: ${comments}`;

    // Display the submitted data in the table
    var dataTableBody = document.getElementById('data-table-body');
    var newRow = dataTableBody.insertRow(dataTableBody.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    cell1.innerHTML = name;
    cell2.innerHTML = email;
    cell3.innerHTML = comments;
    cell4.innerHTML = users;

    // Highlight the pricing plan based on the number of users
    highlightPricingPlan(users);

    // Close the modal
    document.getElementById('myModal').style.display = 'none';

    // Clear the form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('comments').value = '';
    document.getElementById('users').value = '';
}

// Function to highlight the pricing plan
function highlightPricingPlan(users) {
    // Highlight the pricing plan based on the number of users
    var plan1 = document.getElementById('plan1');
    var plan2 = document.getElementById('plan2');
    var plan3 = document.getElementById('plan3');

    // Remove highlighted classes from all plans
    plan1.classList.remove('highlighted-plan1');
    plan2.classList.remove('highlighted-plan2');
    plan3.classList.remove('highlighted-plan3');

    // Add the highlighted class to the appropriate plan based on the number of users
    if (users >= 0 && users < 10) {
        plan1.classList.add('highlighted-plan1');
    } else if (users >= 10 && users < 20) {
        plan2.classList.add('highlighted-plan2');
    } else if (users >= 20) {
        plan3.classList.add('highlighted-plan3');
    }
}

// Lazy Loading - Load more data when reaching the end of the page
var lazyLoadingInProgress = false;
var lazyLoadingPage = 1; // Page number for lazy loading

window.addEventListener('scroll', function () {
    if (lazyLoadingInProgress) return;

    var scrollHeight = document.documentElement.scrollHeight;
    var scrollTop = window.innerHeight + window.scrollY;

    if (scrollTop >= scrollHeight) {
        lazyLoadingInProgress = true;
        loadMoreData();
    }
});

async function loadMoreData() {
    // IMDb API request options
    const imdbOptions = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/auto-complete',
        params: { q: 'game of thrones' }, // Modify the query as needed
        headers: {
            'X-RapidAPI-Key': '515dfa44eamsh02c791f4c30da04p1d2af1jsn0800801261e6',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(imdbOptions);

        // Process and display IMDb data
        var dataContainer = document.getElementById('lazy-loading-data');
        response.data.d.forEach(item => {
            var newData = document.createElement('div');
            newData.className = 'lazy-data-item';
            newData.textContent = `Title: ${item.l}, Year: ${item.y}, Type: ${item.q}`;
            dataContainer.appendChild(newData);
        });

        lazyLoadingPage++; // Increment the page number
        lazyLoadingInProgress = false;
    } catch (error) {
        console.error('Error fetching IMDb data:', error);
        lazyLoadingInProgress = false;
    }
}