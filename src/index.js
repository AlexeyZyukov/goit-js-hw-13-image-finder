import './sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import { alert1, info, success, error1, error2 } from '../node_modules/@pnotify/core/dist/PNotify.js';

// alert1 ({
//     text: 'It is me'
// });

error1({
    text: 'Проверьте правильность ввода названия страны'
});

error2({
    text: 'Слишком много совпадений. Уточните название страны'
});