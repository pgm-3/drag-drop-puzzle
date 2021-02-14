/**
 * The Puzzle Application
 */

/**
 * Helper Functions
 */

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const getRandomPictureArray = () => {
  let pictureArray = [];
  for(let i = 1; i <= 12; i++) pictureArray.push(`p${i}.png`);
  return shuffleArray(pictureArray);
}

/**
 * Cancellation event
 */

const cancel = (e) => {
  if(e.preventDefault) e.preventDefault();
  if(e.stopPropagation) e.stopPropagation();
  return false;
}

/**
 * Create the Drag & Drop API Event Callbacks
 */

const dragStart = (e) => {
  e.dataTransfer.setData('text/plain', e.target.dataset.dropZone);
}

const dragOver = (e) => {
  cancel(e); // cancels default behaviour
}

const drop = (e) => {
  cancel(e); // cancels default behaviour

  // drop in a target that IS in fact a dropzone
  if (e.target.className === 'drag-element') {
    // Get the Id of the zone we are coming from
    const comingFromZoneId = e.dataTransfer.getData('Text')

    // Coming From
    const comingFromZone = document.getElementById(comingFromZoneId);
    const comingFromImage = (comingFromZone.getElementsByClassName('drag-element'))[0];

    // Dropped On
    const droppedOnZone = document.getElementById(e.target.dataset.dropZone);
    const droppedOnImage = (droppedOnZone.getElementsByClassName('drag-element'))[0];

    // Switch Images
    comingFromZone.appendChild(droppedOnImage);
    comingFromImage.dataset.dropZone = droppedOnImage.dataset.dropZone;
    droppedOnZone.appendChild(comingFromImage);
    droppedOnImage.dataset.dropZone = comingFromZoneId;
  }
}

const initPuzzle = () => {
  // get a random picture array
  const randomPictureArray = getRandomPictureArray();

  // add a DOM element for each picture
  for(let i = 0; i < 12; i++) {
    // get the picture
    const picture = randomPictureArray[i];

    // create a new piece of the puzzle
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', `./assets/${picture}`);
    imgElement.classList.add('drag-element');
    imgElement.dataset.dropZone = `dropZone${i+1}`;

    // TODO: add some drag/drop events
    imgElement.addEventListener('dragstart', dragStart);

    // add to dropzone
    const dropZone = document.getElementById(`dropZone${i+1}`);
    dropZone.appendChild(imgElement);
  }

  // TODO init the dropZones
  const dropZones = document.querySelectorAll('.drop-zone');
  dropZones.forEach((dropZone) => {
    //dropZone.addEventListener('dragstart', dragStart);
    dropZone.addEventListener('dragover', dragOver);
    dropZone.addEventListener('drop', drop);
  });
}

initPuzzle();