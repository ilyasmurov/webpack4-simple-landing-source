import { Title, Content } from './lib/App';

const root = document.querySelector('#root');
root.innerHTML = `
  ${Title()}
  ${Content()}
`;