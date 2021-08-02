const myCasesTable = (() => {

  let caseCards;
  let currentPage = 1;
  let rows = 6;

  const caseCardWrapperElement = document.querySelector('.case-card-wrapper');
  const paginationElement = document.getElementById('pagination');
  const buttonNavigation = document.querySelector('.button-navigation');

  const reformatDate = date => {

    const dateContent = date.textContent;
    const year = dateContent.slice(0, 4);
    const month = dateContent.slice(5, 7);
    const day = dateContent.slice(8, date.length);
    const newDateFormat = `${month}/${day}/${year}`;
    return newDateFormat;
  };

 

  const displayActiveCases = (caseCards, caseCardWrapperElement, rows, page) => {
    caseCardWrapperElement.innerHTML = "";
    page--;
    let start = rows * page;
    let end = start + rows;
    let paginatedItems = caseCards.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {

      let caseCard = paginatedItems[i];
      const trCaseCardElement = document.createElement('tr');
      trCaseCardElement.classList ='case-card'; 
      trCaseCardElement.setAttribute('data-id', `${caseCard.id}`);
      trCaseCardElement.setAttribute('data-patient-id', `${caseCard.patientId}`);
      trCaseCardElement.addEventListener('click', () => {alert('click leads to next page')});
      caseCard.innerText = caseCard;

      const tdStatusElement = document.createElement('td');
      tdStatusElement.classList = 'status';
      tdStatusElement.textContent = caseCard.status;
        if (tdStatusElement.textContent == 'completed') {
            tdStatusElement.textContent = 'Completed';
            tdStatusElement.style.backgroundColor = '#5fd76c';
        } else if (tdStatusElement.textContent == 'new') {
            tdStatusElement.textContent = 'Awaiting Specimen';
            tdStatusElement.style.backgroundColor = '#be63e0';
        } else if (tdStatusElement.textContent == 'pending') {
            tdStatusElement.textContent = 'Waiting for Signature';
            tdStatusElement.style.backgroundColor = '#0153ed';
        } else if (tdStatusElement.textContent == 'submitted') {
            tdStatusElement.textContent = 'Order Processing';
            tdStatusElement.style.backgroundColor = '#63dbe0';
        } else if (tdStatusElement.textContent == 'cancelled') {
            tdStatusElement.textContent = 'Cancelled';
        } else if (tdStatusElement.textContent == 'draft') {
            tdStatusElement.textContent = 'Draft';
            tdStatusElement.style.backgroundColor = 'rgb(135,135,135)';
        } else {
            tdStatusElement.textContent = 'In Progress';
            tdStatusElement.style.backgroundColor = '#63dbe0';
        };
      trCaseCardElement.appendChild(tdStatusElement);

      const tdOrderingPhysicianElement = document.createElement('td');
      tdOrderingPhysicianElement.classList = 'ordering-physician';
      tdOrderingPhysicianElement.textContent = caseCard.orderingPhysician;
      trCaseCardElement.appendChild(tdOrderingPhysicianElement);

      const tdPatientNameElement = document.createElement('td');
      tdPatientNameElement.classList = 'patient-name';
      tdPatientNameElement.textContent = `${caseCard.lastName}, ${caseCard.firstName}`;
      trCaseCardElement.appendChild(tdPatientNameElement);

      const tdDOBElement = document.createElement('td');
      tdDOBElement.className = 'dob';
      tdDOBElement.textContent = caseCard.dob;
      const reformatTdDOBElement = reformatDate(tdDOBElement);
      tdDOBElement.textContent = reformatTdDOBElement;
      trCaseCardElement.appendChild(tdDOBElement);

      const tdActivationDateElement = document.createElement('td');
      tdActivationDateElement.classList = 'activation-date';
        if (caseCard.activationDate) {
            tdActivationDateElement.textContent = caseCard.activationDate;
            const reformatTdActivationDateElement = reformatDate(tdActivationDateElement);
            tdActivationDateElement.textContent = reformatTdActivationDateElement;
            trCaseCardElement.appendChild(tdActivationDateElement);
        } else {
            tdActivationDateElement.textContent = '';
            trCaseCardElement.appendChild(tdActivationDateElement);
        };

      const tdCompletionDateElement = document.createElement('td');
      tdCompletionDateElement.classList = 'completion-date';
        if (caseCard.completionDate) {
            tdCompletionDateElement.textContent = caseCard.completionDate;
            const reformatTdCompletionDateElement = reformatDate(tdCompletionDateElement);
            tdCompletionDateElement.textContent = reformatTdCompletionDateElement;
            trCaseCardElement.appendChild(tdCompletionDateElement);
        } else {
            tdCompletionDateElement.textContent = '';
            trCaseCardElement.appendChild(tdCompletionDateElement);
        };

      caseCardWrapperElement.appendChild(trCaseCardElement);
    };
  };

  const setUpActiveCasesPagination = (caseCards, paginationElement, rows) => {
    paginationElement.innerHTML = "";
    let page_count = Math.ceil(caseCards.length / rows);
    for (let i = 1; i < page_count + 1; i++) {
         let btn= paginationButtonActiveCases(i, caseCards);
         paginationElement.appendChild(btn);
    };
  };

  const paginationButtonActiveCases = (page, caseCards) => {
    let button = document.createElement('button');
    button.textContent = page;
    if (currentPage == page) {
        button.classList = 'active';
    };
    button.addEventListener('click', () => {
      currentPage = page;
      displayActiveCases(caseCards, caseCardWrapperElement, rows, currentPage);
    });
    return button;
  };

  const renderActiveCaseCards = () => {

    displayActiveCases(caseCards, caseCardWrapperElement, rows, currentPage);
    setUpActiveCasesPagination(caseCards, paginationElement, rows);

    let totalPages = Math.floor(caseCards.length / rows);
    let previousButtonActiveCases = document.createElement('button');
    previousButtonActiveCases.setAttribute('id', 'previous-button-active-cases');
    previousButtonActiveCases.textContent = 'Previous';
    previousButtonActiveCases.style.fontSize ='10px';
    previousButtonActiveCases.style.fontWeight = 'bold';
    previousButtonActiveCases.style.color = 'rgb(9, 55,232)';
    previousButtonActiveCases.style.width = '80px';
    previousButtonActiveCases.style.height = '30px';
    previousButtonActiveCases.style.border = '0px solid white';
    previousButtonActiveCases.style.borderRadius = '15px';
    previousButtonActiveCases.style.backgroundColor = 'rgb(204, 215, 243)';
    previousButtonActiveCases.style.outline = 'none';
    buttonNavigation.appendChild(previousButtonActiveCases);

    let pageWrapperActiveCases = document.createElement('p');
    pageWrapperActiveCases.setAttribute('id', 'page-wrapper-active-cases');
    buttonNavigation.appendChild(pageWrapperActiveCases);

    let pgActiveCases = document.createElement('p');
    pgActiveCases.classList = 'current-page-count-active-cases';
    pgActiveCases.innerText = `${currentPage} of ${totalPages}`;
    pgActiveCases.style.color = 'black';
    pgActiveCases.style.fontSize = '12px';
    pgActiveCases.style.fontWeight = 'bold';
    pageWrapperActiveCases.innerHTML = "";
    pageWrapperActiveCases.appendChild(pgActiveCases);

    let nextButtonActiveCases = document.createElement('button');
    nextButtonActiveCases.setAttribute('id', 'next-button-active-cases');
    nextButtonActiveCases.textContent = 'Next';
    nextButtonActiveCases.style.fontSize ='10px';
    nextButtonActiveCases.style.fontWeight = 'bold';
    nextButtonActiveCases.style.color = 'rgb(9, 55,232)';
    nextButtonActiveCases.style.width = '80px';
    nextButtonActiveCases.style.height = '30px';
    nextButtonActiveCases.style.border = '0px solid white';
    nextButtonActiveCases.style.borderRadius = '15px';
    nextButtonActiveCases.style.backgroundColor = 'rgb(204, 215, 243)';
    nextButtonActiveCases.style.outline = 'none';
    buttonNavigation.appendChild(nextButtonActiveCases);

    previousButtonActiveCases.addEventListener('click', () => {

      if (currentPage === 1) {
          previousButtonActiveCases.style.color = 'rgb(9, 55,232)';
          previousButtonActiveCases.style.backgroundColor = 'rgb(204, 215, 243);';
          previousButtonActiveCases.style.border = '0px solid white';
          nextButtonActiveCases.style.color = 'white';
          nextButtonActiveCases.style.backgroundColor = 'rgb(124, 157, 241)';
          nextButtonActiveCases.style.border = '2px solid rgb(9, 55,232)';
          return;
      };
      currentPage--;
      displayActiveCases(caseCards, caseCardWrapperElement, rows, currentPage);
      previousButtonActiveCases.style.color = 'white';
      previousButtonActiveCases.style.backgroundColor = 'rgb(124, 157, 241)';
      previousButtonActiveCases.style.border = '2px solid rgb(9, 55,232)';
      let totalPages = Math.floor(caseCards.length / rows);
      let pgActiveCases = document.createElement('p')
      pgActiveCases.classList = 'current-page-count-active-cases';
      pgActiveCases.innerText = `${currentPage} of ${totalPages}`;
      pgActiveCases.style.color = 'black';
      pgActiveCases.style.fontSize = '12px';
      pgActiveCases.style.fontWeight = 'bold';
      pageWrapperActiveCases.innerHTML = "";
      pageWrapperActiveCases.appendChild(pgActiveCases);
    });

    nextButtonActiveCases.addEventListener('click', () => {

      if (currentPage === Math.floor(caseCards.length / rows)) {
          nextButtonActiveCases.style.color = 'rgb(9, 55, 232)';
          nextButtonActiveCases.style.backgroundColor = 'rgb(204, 215, 243);';
          nextButtonActiveCases.style.border = '0px solid white';
          previousButtonActiveCases.style.color = 'white';
          previousButtonActiveCases.style.backgroundColor = 'rgb(124, 157, 241)';
          previousButtonActiveCases.style.border = '2px solid rgb(9, 55,232)';
          return;
      };
      currentPage++;
      displayActiveCases(caseCards, caseCardWrapperElement, rows, currentPage);
      nextButtonActiveCases.style.color = 'white';
      nextButtonActiveCases.style.backgroundColor = 'rgb(124, 157, 241)';
      nextButtonActiveCases.style.border = '2px solid rgb(9, 55,232)';
      let totalPages = Math.floor(caseCards.length / rows);
      let pgActiveCases = document.createElement('p');
      pgActiveCases.classList = 'current-page-count-active-cases';
      pgActiveCases.innerText = `${currentPage} of ${totalPages}`;
      pgActiveCases.style.color = 'black';
      pgActiveCases.style.fontSize = '12px';
      pgActiveCases.style.fontWeight = 'bold';
      pageWrapperActiveCases.innerHTML = "";
      pageWrapperActiveCases.appendChild(pgActiveCases);
    });
  };

  const fetchActiveCaseData = async () => {
    const url = 'https://mi-api.caristest.com/cases?count=300';
    await fetch(url)
      .then(response => {
            return response.json();
      })
      .then(data => {
            caseCards = data;
            renderActiveCaseCards();
      });
  };

  fetchActiveCaseData();

  const displayPastCases = (caseCards, caseCardWrapperElement, rows, page) => {

    caseCardWrapperElement.innerHTML = "";
    page--;
    let start = rows * page;
    let end = start + rows;
    let paginatedItems = caseCards.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {

      let caseCard = paginatedItems[i];

      const trCaseCard = document.createElement('tr');
      trCaseCard.className = "case-card";
      trCaseCard.setAttribute('data-id', `${caseCard.id}`);
      trCaseCard.setAttribute('data-patient-id', `${caseCard.patientId}`);
      trCaseCard.addEventListener('click', () => {alert('Next page')});

      caseCard.innerText = caseCard;

      const tdStatus = document.createElement('td');
      tdStatus.className = 'status';
      tdStatus.textContent = caseCard.status;
      tdStatus.textContent = 'Completed';
      tdStatus.style.backgroundColor = '#5fd76c';
      trCaseCard.appendChild(tdStatus);

      const tdOrderingPhysician = document.createElement('td');
      tdOrderingPhysician.className = 'ordering-physician';
      tdOrderingPhysician.textContent = caseCard.orderingPhysician;
      trCaseCard.appendChild(tdOrderingPhysician);

      const tdPatientName = document.createElement('td');
      tdPatientName.className = 'patient-name';
      tdPatientName.textContent = `${caseCard.lastName}, ${caseCard.firstName}`;
      trCaseCard.appendChild(tdPatientName);

      const tdDOB = document.createElement('td');
      tdDOB.className = 'dob';
      tdDOB.textContent = caseCard.dob;
      const reformatTdDOB = reformatDate(tdDOB);
      tdDOB.textContent = reformatTdDOB;
      trCaseCard.appendChild(tdDOB);

      const tdActivationDate = document.createElement('td');
      tdActivationDate.className = 'activation-date';
        if (caseCard.activationDate) {
            tdActivationDate.textContent = caseCard.activationDate;
            const reformatTdActivationDate = reformatDate(tdActivationDate);
            tdActivationDate.textContent = reformatTdActivationDate;
            trCaseCard.appendChild(tdActivationDate);
        } else {
            tdActivationDate.textContent = '';
            trCaseCard.appendChild(tdActivationDate);
        };

      const tdCompletionDate = document.createElement('td');
      tdCompletionDate.className = 'completion-date';
        if (caseCard.completionDate) {
            tdCompletionDate.textContent = caseCard.completionDate;
            const reformatTdCompletionDate = reformatDate(tdCompletionDate);
            tdCompletionDate.textContent = reformatTdCompletionDate;
            trCaseCard.appendChild(tdCompletionDate);
        } else {
            tdCompletionDate.textContent = '';
            trCaseCard.appendChild(tdCompletionDate);
        };

      caseCardWrapperElement.appendChild(trCaseCard);
    };
  };

  const setUpPastCasesPagination = (caseCards, paginationElement, rows) => {
    paginationElement.innerHTML = "";
    let page_count = Math.ceil(caseCards.length / rows);
    for (let i = 1; i < page_count + 1; i++) {
         let btn= paginationButtonPastCases(i, caseCards);
         paginationElement.appendChild(btn);
    };
  };

  const paginationButtonPastCases = (page, caseCards) => {
    let button = document.createElement('button');
    button.textContent = page;
    if (currentPage == page) {
        button.classList = 'active';
    };
    button.addEventListener('click', () => {
      currentPage = page;
      displayPastCases(caseCards, caseCardWrapperElement, rows, currentPage);
    });
    return button;
  };

  const renderPastCaseCards = () => {

    displayPastCases(caseCards, caseCardWrapperElement, rows, currentPage);
    setUpPastCasesPagination(caseCards, paginationElement, rows);
    let totalPages = Math.floor(caseCards.length / rows);

    let previousButtonPastCases = document.createElement('button');
    previousButtonPastCases.setAttribute('id', 'previous-button-past-cases');
    previousButtonPastCases.textContent = 'Previous';
    previousButtonPastCases.style.fontSize ='10px';
    previousButtonPastCases.style.fontWeight = 'bold';
    previousButtonPastCases.style.color = 'rgb(9, 55,232)';
    previousButtonPastCases.style.width = '80px';
    previousButtonPastCases.style.height = '30px';
    previousButtonPastCases.style.border = '0px solid white';
    previousButtonPastCases.style.borderRadius = '15px';
    previousButtonPastCases.style.backgroundColor = 'rgb(204, 215, 243)';
    previousButtonPastCases.style.outline = 'none';
    buttonNavigation.appendChild(previousButtonPastCases);

    let pageWrapperPastCases = document.createElement('p');
    pageWrapperPastCases.setAttribute('id', 'page-wrapper-past-cases');
    buttonNavigation.appendChild(pageWrapperPastCases);

    let pgPastCases = document.createElement('p');
    pgPastCases.classList = 'current-page-count-past-cases';
    pgPastCases.innerText = `${currentPage} of ${totalPages}`;
    pgPastCases.style.color = 'black';
    pgPastCases.style.fontSize = '12px';
    pgPastCases.style.fontWeight = 'bold';
    pageWrapperPastCases.innerHTML = "";
    pageWrapperPastCases.appendChild(pgPastCases);

    let nextButtonPastCases = document.createElement('button');
    nextButtonPastCases.setAttribute('id', 'next-button-past-cases');
    nextButtonPastCases.textContent = 'Next';
    nextButtonPastCases.style.fontSize ='10px';
    nextButtonPastCases.style.fontWeight = 'bold';
    nextButtonPastCases.style.color = 'rgb(9, 55,232)';
    nextButtonPastCases.style.width = '80px';
    nextButtonPastCases.style.height = '30px';
    nextButtonPastCases.style.border = '0px solid white';
    nextButtonPastCases.style.borderRadius = '15px';
    nextButtonPastCases.style.backgroundColor = 'rgb(204, 215, 243)';
    nextButtonPastCases.style.outline = 'none';
    buttonNavigation.appendChild(nextButtonPastCases);

    previousButtonPastCases.addEventListener('click', () => {
      if (currentPage === 1) {
          previousButtonPastCases.style.color = 'rgb(9, 55,232)';
          previousButtonPastCases.style.backgroundColor = 'rgb(204, 215, 243);';
          previousButtonPastCases.style.border = '0px solid white';
          nextButtonPastCases.style.color = 'white';
          nextButtonPastCases.style.backgroundColor = 'rgb(124, 157, 241)';
          nextButtonPastCases.style.border = '2px solid rgb(9, 55,232)';
          return;
      };
      currentPage--;
      displayPastCases(caseCards, caseCardWrapperElement, rows, currentPage);
      previousButtonPastCases.style.color = 'white';
      previousButtonPastCases.style.backgroundColor = 'rgb(124, 157, 241)';
      previousButtonPastCases.style.border = '2px solid rgb(9, 55,232)';
      let totalPages = Math.floor(caseCards.length / rows)

      let pgPastCases = document.createElement('p');
      pgPastCases.classList = 'current-page-count-past-cases';
      pgPastCases.innerText = `${currentPage} of ${totalPages}`;
      pgPastCases.style.color = 'black';
      pgPastCases.style.fontSize = '12px';
      pgPastCases.style.fontWeight = 'bold';
      pageWrapperPastCases.innerHTML = "";
      pageWrapperPastCases.appendChild(pgPastCases);
    });

    nextButtonPastCases.addEventListener('click', () => {
      if (currentPage === Math.floor(caseCards.length / rows)) {
          nextButtonPastCases.style.color = 'rgb(9, 55, 232)';
          nextButtonPastCases.style.backgroundColor = 'rgb(204, 215, 243);';
          nextButtonPastCases.style.border = '0px solid white';
          previousButtonPastCases.style.color = 'white';
          previousButtonPastCases.style.backgroundColor = 'rgb(124, 157, 241)';
          previousButtonPastCases.style.border = '2px solid rgb(9, 55,232)';
          return;
      };
      currentPage++;
      displayPastCases(caseCards, caseCardWrapperElement, rows, currentPage);
      nextButtonPastCases.style.color = 'white';
      nextButtonPastCases.style.backgroundColor = 'rgb(124, 157, 241)';
      nextButtonPastCases.style.border = '2px solid rgb(9, 55,232)';
      let totalPages = Math.floor(caseCards.length / rows);

      let pgPastCases = document.createElement('p');
      pgPastCases.classList = 'current-page-count-past-cases';
      pgPastCases.innerText = `${currentPage} of ${totalPages}`;
      pgPastCases.style.color = 'black';
      pgPastCases.style.fontSize = '12px';
      pgPastCases.style.fontWeight = 'bold';
      pageWrapperPastCases.innerHTML = "";
      pageWrapperPastCases.appendChild(pgPastCases);
    });
  };

  const fetchPastCaseData = async () => {
    const url = 'https://mi-api.caristest.com/cases?count=300';
    await fetch(url)
      .then(response => {
            return response.json();
      })
      .then(data => {
            caseCards = data;
            const filteredCaseCards =caseCards.filter(caseCard => caseCard.status === 'completed')
            console.log(data[0].status)
            console.log(filteredCaseCards)
            renderPastCaseCards();
            creatingSearchOptions();
      });
  };

  const activeCasesTab = document.querySelector('#active-cases');
  activeCasesTab.addEventListener('click', () => {
    fetchActiveCaseData();
    const clickActiveCasesTab = () => {
      document.querySelector('.case-card-wrapper').innerHTML='';
      
      const pastCasesTabButton = document.querySelector('#past-cases');
      pastCasesTabButton.style.color = 'black';
      pastCasesTabButton.style.borderBottom = '4px solid white';

      const activeCasesTabButton = document.querySelector('#active-cases');
      activeCasesTabButton.style.color = 'rgb(9,55,232)';
      activeCasesTabButton.style.borderBottom = '4px solid rgb(9,55,232)';

      let previousButtonPastCasesRemove = document.getElementById('previous-button-past-cases');
      previousButtonPastCasesRemove.remove();

      let pageWrapperPastCasesRemove = document.getElementById('page-wrapper-past-cases');
      pageWrapperPastCasesRemove.remove();

      let nextButtonPastCasesRemove = document.getElementById('next-button-past-cases');
      nextButtonPastCasesRemove.remove();

      document.querySelector('.search-wrapper-class').style.display = 'none';
    };
    clickActiveCasesTab();
  });

  const pastCasesTab = document.querySelector('#past-cases');

  pastCasesTab.addEventListener('click', () => {
    fetchPastCaseData();
    const clickPastCasesTab = () => {
      document.querySelector('.case-card-wrapper').innerHTML='';

      const activeCasesTabButton = document.querySelector('#active-cases');
      activeCasesTabButton.style.color = 'black';
      activeCasesTabButton.style.borderBottom = '4px solid white';

      const pastCasesTabButton = document.querySelector('#past-cases');
      pastCasesTabButton.style.color = 'rgb(9,55,232)';
      pastCasesTabButton.style.borderBottom = '4px solid rgb(9,55,232)';

      let previousButtonActiveCasesRemove = document.getElementById('previous-button-active-cases');
      previousButtonActiveCasesRemove.remove();

      let pageWrapperActiveCasesRemove = document.getElementById('page-wrapper-active-cases');
      pageWrapperActiveCasesRemove.remove();

      let nextButtonActiveCasesRemove = document.getElementById('next-button-active-cases');
      nextButtonActiveCasesRemove.remove();

      document.querySelector('.search-wrapper-class').style.display = 'block';
    };
    clickPastCasesTab();
  });

 
  /*---------------
  ---------------
    Search Filter
  ---------------
  ---------------*/

function matchCustom(params, data) {
  // If there are no search terms, return all of the data
  if ($.trim(params.term) === '') {
    return data;
  }
  // Do not display the item if there is no 'text' property
  if (typeof data.text === 'undefined') {
    return null;
  }
  // `params.term` should be the term that is used for searching
  // `data.text` is the text that is displayed for the data object
  if (data.text.toLocaleLowerCase().startsWith(params.term.toLocaleLowerCase())) {
    var modifiedData = $.extend({}, data, true);
    // You can return modified objects from here
    // This includes matching the `children` how you want in nested data sets
    return modifiedData;
  }
  // Return `null` if the term should not be displayed
  return null;
}

function creatingSearchOptions() {

  const selectOptionsBody = document.querySelector('#select-items');
  const selectOptions = document.querySelectorAll('#select-items option');
  for (const elem of selectOptions) {
    elem.remove();
  }

  caseCards.sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  const option = document.createElement('option');
  option.textContent = 'All';
  selectOptionsBody.appendChild(option);

  caseCards.map(caseCard => {
    if (caseCard.status == 'completed') {
      const option = document.createElement('option');
      option.textContent = caseCard.lastName+', '+caseCard.firstName;
      selectOptionsBody.appendChild(option);
    }
  })

  $("#select-items").select2({
    matcher: matchCustom,
    sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
  });
}

$("#select-items").select2({
  matcher: matchCustom,
  sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
});

//select options onselect event 
$('#select-items').on('select2:select', function (e) {
  if (e.params.data.text != '') {
    let ipValue = e.params.data.text
    if (ipValue != 'All') {
      ipValue = ipValue.split(',');
      ipValue = ipValue[0].trim();
    }
    capturedSelectedIp(ipValue);
  }
});

//Filtering response based on the input passed:
function capturedSelectedIp(searchInput) {
  let filteredData;
  if (searchInput != 'All') {
    filteredData = caseCards.filter(value => {
      const searchStr = searchInput.toLowerCase();
      const lastNameMatches = value.lastName.toLowerCase().includes(searchStr);
      return lastNameMatches;
    });
  } else {
    creatingSearchOptions(); 
    filteredData = caseCards;
  }
  // console.log(filteredData);
  document.querySelector('.case-card-wrapper').innerHTML = '';
  const containerTbody = document.querySelector('.case-card-wrapper');

  filteredData.map(caseCard => {

    const trCaseCard = document.createElement('tr');
    trCaseCard.className = "case-card";
    trCaseCard.setAttribute('id', `${caseCard.id}`);
    trCaseCard.addEventListener('click', () => { alert('Next page') });

    const tdStatus = document.createElement('td');
    tdStatus.className = 'status';
    tdStatus.textContent = caseCard.status;

    while (tdStatus.textContent == 'completed') {
      tdStatus.textContent = 'Completed';
      tdStatus.style.backgroundColor = '#5fd76c';
      trCaseCard.appendChild(tdStatus);

      const tdOrderingPhysician = document.createElement('td');
      tdOrderingPhysician.className = 'ordering-physician';
      tdOrderingPhysician.textContent = caseCard.orderingPhysician;
      trCaseCard.appendChild(tdOrderingPhysician);

      const tdPatientName = document.createElement('td');
      tdPatientName.className = 'patient-name';
      tdPatientName.textContent = `${caseCard.lastName}, ${caseCard.firstName}`;
      trCaseCard.appendChild(tdPatientName);

      const tdDOB = document.createElement('td');
      tdDOB.className = 'dob';
      tdDOB.textContent = caseCard.dob;

      const reformatTdDOB = reformatDate(tdDOB);
      tdDOB.textContent = reformatTdDOB;
      trCaseCard.appendChild(tdDOB);

      const tdActivationDate = document.createElement('td');
      tdActivationDate.className = 'activation-date';
      if (caseCard.activationDate) {
        tdActivationDate.textContent = caseCard.activationDate;
        const reformatTdActivationDate = reformatDate(tdActivationDate);
        tdActivationDate.textContent = reformatTdActivationDate;
        trCaseCard.appendChild(tdActivationDate);
      } else {
        tdActivationDate.textContent = '';
        trCaseCard.appendChild(tdActivationDate);
      }

      const tdCompletionDate = document.createElement('td');
      tdCompletionDate.className = 'completion-date';
      if (caseCard.completionDate) {
        tdCompletionDate.textContent = caseCard.completionDate;
        const reformatTdCompletionDate = reformatDate(tdCompletionDate);
        tdCompletionDate.textContent = reformatTdCompletionDate;
        trCaseCard.appendChild(tdCompletionDate);
      } else {
        tdCompletionDate.textContent = '';
        trCaseCard.appendChild(tdCompletionDate);
      }

      containerTbody.appendChild(trCaseCard);
    };
  });
}
// End of search filter
})();

  //------npor49-------------------------------//

  //sorting function ascending

  const sortDataAscending = data => ((a,b) => a - b);

  //sorting function descending

  const sortDataDescending = data => ((a,b) => b - a);

  //----------------------------------------------//i