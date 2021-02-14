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

// TODO: Create a cancel method that will prevent default behaviour

/**
 * Create the Drag & Drop API Event Callbacks
 */

// TODO: Add a dragStart function

// TODO: Add a dragOver function

// TODO: Add a drop function

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

    // TODO: add the dragstart event

    // add to dropzone
    const dropZone = document.getElementById(`dropZone${i+1}`);
    dropZone.appendChild(imgElement);
  }

  // TODO init the dropZones and add dragover & drop event
}

initPuzzle();