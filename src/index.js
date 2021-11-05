import './sass/main.scss';
import PhotoCard from './markup/cards.hbs';
import fatch from './partials/apiService.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error, success } from '@pnotify/core';

const refs = {
    inputValue: document.querySelector(`.search-form`),
    responseContainer: document.querySelector(`.gallery`),
    loadMore: document.querySelector('.loadMore'),
}
refs.inputValue.addEventListener('submit', showImages);
refs.loadMore.addEventListener('click', showMore);
let inputValue = '';
var number = 0;

function showImages(event) {
    event.preventDefault()
    refs.responseContainer.innerHTML = ''
    inputValue = event.currentTarget.elements.query.value.trim();
    number = 1;

    if (inputValue === '') {
        refs.loadMore.classList.add('is-hidden');
        return  error({
            text: 'Please write something',
            delay: 1000
        });
    }  
    fatch(inputValue, number)
        .then(value => {
            responseVarification(value)
        })
        .then(refs.loadMore.classList.remove('is-hidden'))
        .then(event.currentTarget.elements.query.value='')
        .catch(error => {
            console.log(error);
        })
};

function responseVarification(value) {
    refs.responseContainer.insertAdjacentHTML('beforeend', PhotoCard(value.hits))
    if (value.hits.length === 0) {
        refs.loadMore.classList.add('is-hidden');
        error({
            title: 'Sorry',
            text: 'Not Found',
            delay: 1000
        })}           
}

function scroll() {
    var scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
    );
    window.scrollTo(0, scrollHeight-1018)
    }

function showMore() {
    number +=1
    fatch(inputValue, number)
        .then(value => {
            responseVarification(value)
        })
        .then(setTimeout(() => {
            scroll()
        }, 700
        ))
        .catch(error => {
            refs.loadMore.classList.add('is-hidden');
            console.log(error);
        });
};
