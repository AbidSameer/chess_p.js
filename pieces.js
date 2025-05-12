export const rook = `
<div class="piece" id="rook" draggable="true">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
  <path d="M32 32V96H64V64H96V96H128V64H160V96H192V32H32zM0 128H288V160H256V288H224V480H64V288H32V160H0V128z"/>
</svg>
</div>
`;

export const knight = `
<div class="piece" id="knight" draggable="true">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
  <path d="M19 272C30 180 80 120 160 80c0 40 40 80 80 80v64c0 18-14 32-32 32v64h32v32H64v-80H19z"/>
</svg>
</div>
`;

export const bishop = `
<div class="piece" id="bishop" draggable="true">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
  <path d="M160 0C88 80 80 160 160 240c80-80 72-160 0-240zm-32 320h64v64h-64v-64zm-32 96h128v64H96v-64z"/>
</svg>
</div>
`;

export const queen = `
<div class="piece" id="queen" draggable="true">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
  <path d="M64 400h320l28.9-159C416 86 330 0 224 0S32 86 35.1 241L64 400zm-41.4 73.4C16 501.9 26.1 512 38.6 512H409.4c12.5 0 22.6-10.1 22.6-22.6L384 432H64L22.6 473.4z"/>
</svg>
</div>
`;

export const king = `
<div class="piece" id="king" draggable="true">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
  <path d="M200 0h48v64h64v48h-64v64h-48V112h-64V64h64V0zM96 400h256l32-160H64l32 160zm-54.6 73.4C16 501.9 26.1 512 38.6 512H409.4c12.5 0 22.6-10.1 22.6-22.6L384 432H64L41.4 473.4z"/>
</svg>
</div>
`;

export const pawn = `
<div class="piece" id="pawn" draggable="true">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
  <path d="M160 0a64 64 0 1 0 0 128 64 64 0 1 0 0-128zm0 160c-71.6 0-128 64-128 128h256c0-64-56.4-128-128-128zm-96 160h192v64H64v-64zm-32 96h256v64H32v-64z"/>
</svg>
</div>
`;
