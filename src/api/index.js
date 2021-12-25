import axios from 'axios';
import { useDispatch } from 'react-redux';

export const api = axios.create({
  baseURL: 'http://54.226.57.233:8080',
});

const users = [
  {
    id: 'user1',
    password: 'pass1',
    token: 'test1',
    name: 'John Doe',
    keywords: ['react', 'redux', 'node.js'],
  },
  {
    id: 'user2',
    password: 'pass2',
    token: 'test2',
    name: 'Jane Doe',
    keywords: ['jquery', 'css', 'html'],
  },
  {
    id: 'user3',
    password: 'pass3',
    token: 'test3',
    name: 'Jake Doe',
    keywords: ['android', 'potter', 'voldemort'],
  },
];

export const userSignUp = async (id, pw, username, callback) => {
  try {
    const response = await api.post('/api/sign-up', {
      email: id,
      password: pw,
      name: username,
    });
    callback();
    console.log(response.data)
  } catch (e) {
    console.log(e);
  }
};

export const userSignIn = async (id, pw, callback) => {
  try {
    const response = await api.post('/api/sign-in', {
      email: id,
      password: pw,
    });
    window.localStorage.setItem(
      'userInfoEx',
      JSON.stringify(response.data.result)
    );
    callback();
    console.log(response.data)
  } catch (e) {
    console.log(e);
  }
};

export async function syncBookmark(data) {
  data.forEach(async (tab) => {
    try {
      const response = await api.post('/api/memberbookmark', {
        title: tab.title,
        link: tab.url,
      });
      console.log(response.data)
    } catch (e) {
      console.log(e);
    }
  });
}

export function registerBookmark(pageTitle) {
  let queryOptions = { active: true, currentWindow: true };
  const token = JSON.parse(window.localStorage.getItem('userInfoEx')).token

  chrome.tabs.query(queryOptions, async function (tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.log(url);
    console.log(tab.title);

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("1",axios.defaults.headers.common["Authorization"])
      console.log("2",token)
      console.log("3",pageTitle)
      
      const response = await api.post('/api/memberbookmark', {
        title: pageTitle,
        link: url
      });
      console.log(response.data)
    } catch (e) {
      console.log(e);
    }
  });
}

export function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true,
  };
  chrome.tabs.query(queryInfo, function (tabs) {
    var tab = tabs[0];
    var url = tab.url;
    callback(url);
  });
}

export function renderURL(statusText) {
  document.getElementById('url').textContent = statusText;
}
