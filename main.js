document.addEventListener('DOMContentLoaded', function() {
    // Function to parse URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // Function to fetch JSON data from URL
    function fetchData(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Function to find data by Record ID
    function findDataByID(data, recordID) {
        return data.find(item => item['RecordID'] === recordID);
    }

    const apiUrl = 'https://sheetdb.io/api/v1/gg84kbvk5zpuh';
    const recordIDToDisplay = getUrlParameter('RecordID');

    fetchData(apiUrl)
        .then(data => {
            const dataToDisplay = findDataByID(data, recordIDToDisplay);

            if (dataToDisplay) {
                const sections = ['sections1', 'sections2', 'sections3', 'sections4', 'sections5'];
                const fields = ['First Name', 'BIRTHDATE', 'Middle Name', 'Last Name', 'First Name', 'Middle Name', 'Last Name', 'BIRTHDATE'];

                sections.forEach((section, index) => {
                    const sectionElement = document.getElementsByClassName(section)[0];
                    const fieldsDivs = sectionElement.getElementsByClassName('textCss');
                    
                    fieldsDivs[0].innerHTML = dataToDisplay['First Name'];
                    fieldsDivs[1].innerHTML = dataToDisplay['BIRTHDATE'];
                    fieldsDivs[2].innerHTML = dataToDisplay['Middle Name'];
                    fieldsDivs[3].innerHTML = dataToDisplay['Last Name'];
                    fieldsDivs[4].innerHTML = dataToDisplay['First Name'];
                    fieldsDivs[5].innerHTML = dataToDisplay['Middle Name'];
                    fieldsDivs[6].innerHTML = dataToDisplay['Last Name'];
                    fieldsDivs[7].innerHTML = dataToDisplay['BIRTHDATE'];
                });
            } else {
                console.error("Record ID not found");
            }
        });
});
